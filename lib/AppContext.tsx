"use client";

import React from "react";
import {
  AppContextPropI,
  ContextValuesI,
  FolderI,
  ImgI,
  SettingsI,
} from "./firebaseTypes";
import { addDoc, collection } from "firebase/firestore";
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
  function getFolderImages(folderName: string): ImgI[] {
    let folder = folders.find((f) => f.name === folderName);
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

  async function createFolder(data: FolderI) {
    //Add folder to DB
    const foldersRef = collection(db, "folders");
    await addDoc(foldersRef, data);

    setFolders((prev) => [...prev, data]);
  }

  const value: ContextValuesI = { folders, getFolderImages, createFolder };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
