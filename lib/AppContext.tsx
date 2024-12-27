"use client";

import React from "react";
import { AppContextPropI, FolderI, ImgI, SettingsI } from "./firebaseTypes";

interface values {}

const AppContext = React.createContext({} as values);

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

  const value: values = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
