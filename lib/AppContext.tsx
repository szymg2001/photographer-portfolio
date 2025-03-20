"use client";

import React from "react";
import {
  AppContextPropI,
  ContextValuesI,
  CreateFolderI,
  FolderI,
  ImgI,
} from "./firebaseTypes";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import useAuth from "./useAuth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { extractToken } from "./api";
import imageCompression from "browser-image-compression";

const AppContext = React.createContext({} as ContextValuesI);

export const useAppContext = () => {
  return React.useContext(AppContext);
};

export const AppContextProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: AppContextPropI;
}) => {
  //State
  const { user, handleLogin, handleLogout, authError, resetPassword } =
    useAuth();
  const [isUploading, setIsUploading] = React.useState<string>("");
  const [folders, setFolders] = React.useState(initialData.folders);
  const [settings, setSettings] = React.useState(initialData.settings);
  const [imgs, setImgs] = React.useState(initialData.imgs);

  //Methods
  async function uploadImages(files: FileList) {
    if (!files || files.length === 0) return;

    const uploadedImages: ImgI[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type || file.type.split("/")[0] !== "image") {
        throw new Error("Przesłano niepoprawny plik. Dozwolone tylko zdjęcia.");
      }

      setIsUploading(
        `${i + 1}/${files.length} Kompresja zdjęcia "${file.name}"`
      );

      const compressedFile = await imageCompression(file, {
        fileType: "image/webp",
        maxSizeMB: 1,
        useWebWorker: true,
        initialQuality: 1,
      });

      setIsUploading(
        `${i + 1}/${files.length} Przesyłanie zdjęcia "${file.name}"`
      );
      const storageRef = ref(storage, `files/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);

      const url = await getDownloadURL(storageRef);
      uploadedImages.push({ id: extractToken(url), url });
    }
    setImgs((prev) => [...prev, ...uploadedImages]);
    setIsUploading("");
  }

  function getFolderImages(
    value: string,
    searchBy: "id" | "name" = "id"
  ): ImgI[] {
    let folder = folders.find((f) => f[searchBy] === value);
    if (!folder) return [];

    return getImages(folder.images);
  }

  function getFolder(id: string): FolderI | null {
    let folder = folders.find((f) => f.id === id);
    return folder ? folder : null;
  }

  function getImages(idArray: string[]): ImgI[] {
    const imgArray: ImgI[] = [];
    const imgMap = new Map(imgs.map((img) => [img.id, img]));

    idArray.forEach((id) => {
      const img = imgMap.get(id);
      if (img) imgArray.push(img);
    });

    return imgArray;
  }

  async function createFolder(data: CreateFolderI) {
    //Add folder to DB
    const foldersRef = collection(db, "folders");
    const docRef = await addDoc(foldersRef, data);

    const folderData = { ...data, id: docRef.id };
    await setDoc(docRef, folderData);
    setFolders((prev) => [...prev, { ...data, id: docRef.id }]);
  }

  async function editFolder(data: FolderI) {
    let folderRef = doc(db, "folders", data.id);
    await setDoc(folderRef, data);

    let folderIndex = folders.findIndex((f) => f.id === data.id);
    setFolders((prev) => [
      ...prev.map((f, index) => (index === folderIndex ? data : f)),
    ]);
  }

  async function changePortfolioOrder(
    data: { direction: -1 | 1; index: number } | string[]
  ) {
    let settingsRef = doc(db, "settings", "main");
    let newOrder: string[] = [];

    if ("direction" in data) {
      let { direction, index } = data;

      newOrder = [...settings.portfolioOrder];
      let temp = settings.portfolioOrder[index];
      newOrder[index] = newOrder[index + direction];
      newOrder[index + direction] = temp;
    } else {
      newOrder = data;
    }

    await updateDoc(settingsRef, { portfolioOrder: newOrder });

    setSettings((prev) => ({ ...prev, portfolioOrder: [...newOrder] }));
  }
  /* async function changePortfolioOrder(direction: -1 | 1, index: number) {
    if (index === 0 && direction === -1) return;
    if (index === settings.portfolioOrder.length - 1 && direction === 1) return;

    let newOrder = [...settings.portfolioOrder];
    let temp = settings.portfolioOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;

    let settingsRef = doc(db, "settings", "main");
    await updateDoc(settingsRef, { portfolioOrder: newOrder });

    setSettings((prev) => ({ ...prev, portfolioOrder: [...newOrder] }));
  } */

  function getFolderCover(id: string) {
    let folder = getFolder(id);
    if (!folder) return "not found url";

    return folder.coverId
      ? getImages([folder.coverId])[0].url
      : getImages(folder.images)[0].url;
  }

  function getStoragePath(url: string): string {
    let filePath = url.split("/o/")[1];
    filePath = filePath.split("?")[0];
    return decodeURIComponent(filePath);
  }

  async function removeImg(urls: string[]) {
    if (!urls || urls.length === 0) return;
    urls.forEach(async (url) => {
      let path = getStoragePath(url);
      let fileRef = ref(storage, path);
      await deleteObject(fileRef);
    });

    let newImgs: ImgI[] = imgs.filter((i) => !urls.some((v) => v === i.url));
    setImgs(newImgs);
  }

  async function removeImgFromFolder(imgId: string, folderId: string) {
    let folderRef = doc(db, "folders", folderId);

    await updateDoc(folderRef, {
      images: arrayRemove(imgId),
    });

    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId
          ? { ...f, images: f.images.filter((i) => i !== imgId) }
          : f
      )
    );
  }

  async function removeFolder(folderId: string) {
    let folderRef = doc(db, "folders", folderId);

    let folderData = folders.find((f) => f.id === folderId);
    if (!folderData) throw new Error("Nie znaleziono folderu");

    if (folderData.isDefault)
      throw new Error(
        "Nie można usunąć tego folderu, uniemożliwi to poprawne działanie strony."
      );

    await deleteDoc(folderRef);
  }

  const value: ContextValuesI = {
    user,
    folders,
    imgs,
    settings,
    authError,
    isUploading,

    //FOLDER
    getFolder,
    createFolder,
    editFolder,
    removeFolder,
    removeImgFromFolder,
    getFolderImages,
    getFolderCover,

    //IMG
    uploadImages,
    getImages,
    removeImg,

    //AUTH
    handleLogin,
    handleLogout,
    resetPassword,

    //OTHER
    changePortfolioOrder,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
