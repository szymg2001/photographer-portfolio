"use client";

import React from "react";
import {
  AppContextPropI,
  ContextValuesI,
  FolderFormI,
  FolderI,
  ImgI,
  SettingsI,
} from "./firebaseTypes";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

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
  const [folders, setFolders] = React.useState(initialData.folders);
  const [settings, setSettings] = React.useState(initialData.settings);
  const [imgs, setImgs] = React.useState(initialData.imgs);

  //Methods
  function getFolderImagesByName(folderName: string): ImgI[] {
    let folder = folders.find((f) => f.name === folderName);
    if (!folder) return [];

    return getImages(folder.images);
  }

  function findFolder(id: string): FolderI | null {
    let folder = folders.find((f) => f.id === id);
    return folder ? folder : null;
  }

  function getFolderImagesById(folderId: string): ImgI[] {
    let folder = folders.find((f) => f.id === folderId);
    if (!folder) return [];

    return getImages(folder.images);
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

  const value: ContextValuesI = {
    folders,
    imgs,
    settings,
    getFolderImagesByName,
    getFolderImagesById,
    createFolder,
    getImages,
    editFolder,
    changePortfolioOrder,
    findFolder,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
