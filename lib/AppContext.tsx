"use client";

import React from "react";
import {
  AppContextPropI,
  ContextValuesI,
  FolderFormI,
  FolderI,
  ImgI,
} from "./firebaseTypes";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import useAuth from "./useAuth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { extractToken } from "./api";

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
  const { user, handleLogin, handleLogout, authError } = useAuth();
  const [folders, setFolders] = React.useState(initialData.folders);
  const [settings, setSettings] = React.useState(initialData.settings);
  const [imgs, setImgs] = React.useState(initialData.imgs);

  //Methods
  async function uploadImages(files: FileList) {
    if (!files || files.length === 0) return;
    try {
      const uploadedImages: ImgI[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);

        const url = await getDownloadURL(storageRef);
        uploadedImages.push({ id: extractToken(url), url });
      }
      setImgs((prev) => [...prev, ...uploadedImages]);
    } catch (error) {}
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

  async function createFolder(data: FolderFormI) {
    //Add folder to DB
    const foldersRef = collection(db, "folders");
    const docRef = await addDoc(foldersRef, data);

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

  async function changePortfolioOrder(direction: -1 | 1, index: number) {
    if (index === 0 && direction === -1) return;
    if (index === settings.portfolioOrder.length - 1 && direction === 1) return;

    let newOrder = [...settings.portfolioOrder];
    let temp = settings.portfolioOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;

    let settingsRef = doc(db, "settings", "main");
    await updateDoc(settingsRef, { portfolioOrder: newOrder });

    setSettings((prev) => ({ ...prev, portfolioOrder: [...newOrder] }));
  }

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

  async function removeImg(url: string) {
    let path = getStoragePath(url);

    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  }

  const value: ContextValuesI = {
    user,
    folders,
    imgs,
    settings,
    authError,
    handleLogin,
    handleLogout,
    getFolder,
    getFolderImages,
    createFolder,
    getImages,
    editFolder,
    changePortfolioOrder,
    getFolderCover,
    uploadImages,
    removeImg,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
