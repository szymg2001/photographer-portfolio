export interface FolderI {
  id: string;
  name: string;
  isDefault: boolean;
  description: string;
  createdAt: string;
  images: string[];
  displayed: boolean;
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
