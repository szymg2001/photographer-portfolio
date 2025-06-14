import { User } from "firebase/auth";

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
  coverId: string | null;
  photoDate: string;
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
  user: User | null;
  folders: FolderI[];
  imgs: ImgI[];
  settings: SettingsI;
  authError: string;
  isUploading: string;

  uploadImages: (files: FileList) => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  getFolderImages: (value: string, searchBy?: "id" | "name") => ImgI[];
  createFolder: (data: CreateFolderI) => void;
  getImages: (idArray: string[]) => ImgI[];
  editFolder: (data: FolderI) => void;
  changePortfolioOrder: (
    data: { direction: -1 | 1; index: number } | string[]
  ) => void;
  getFolder: (id: string) => FolderI | null;
  getFolderCover: (id: string) => string;
  removeImg: (urls: string[]) => void;
  removeImgFromFolder: (imgId: string, folderId: string) => void;
  resetPassword: (email: string) => void;
  removeFolder: (folderId: string) => void;
}

export type CreateFolderI = Omit<FolderI, "id">;
export const initialFolderData: CreateFolderI = {
  name: "",
  images: [],
  isDefault: false,
  createdAt: new Date().toISOString(),
  photoDate: new Date().toISOString(),
  showInPortfolio: false,
  description: "",
  public: false,
  coverId: null,
};
