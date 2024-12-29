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
  settings: SettingsI;
  getFolderImagesByName: (folderName: string) => ImgI[];
  getFolderImagesById: (folderId: string) => ImgI[];
  createFolder: (data: FolderFormI) => void;
  getImages: (idArray: string[]) => ImgI[];
  editFolder: (data: FolderI) => void;
  changePortfolioOrder: (direction: -1 | 1, index: number) => void;
}

export type FolderFormI = Omit<FolderI, "id">;
export const initialFolderData: FolderFormI = {
  name: "",
  images: [],
  isDefault: false,
  createdAt: new Date().toISOString(),
  showInPortfolio: false,
  description: "",
  public: false,
};
