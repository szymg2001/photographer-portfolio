import { v4 } from "uuid";

export interface FolderI {
  id: string;
  name: string;
  isDefault: boolean;
  description: string;
  createdAt: string;
  images: string[];
  /* displayed: boolean; */
  public: boolean;
  imgLimit?: number;
  showInPortfolio: boolean;
}

export interface ImgI {
  id: string;
  url: string;
}

export interface SettingsI {
  portfolioOrder: string[];
}

export interface AppContextPropI {
  settings: SettingsI;
  folders: FolderI[];
  imgs: ImgI[];
}

export interface ContextValuesI {
  folders: FolderI[];
  imgs: ImgI[];
  getFolderImagesByName: (folderName: string) => ImgI[];
  getFolderImagesById: (folderId: string) => ImgI[];
  createFolder: (data: FolderI) => void;
  getImages: (idArray: string[]) => ImgI[];
  editFolder: (data: FolderI) => void;
}

export const initialFolderData: FolderI = {
  name: "",
  images: [],
  isDefault: false,
  createdAt: new Date().toISOString(),
  showInPortfolio: false,
  description: "",
  id: v4(),
  public: false,
};
