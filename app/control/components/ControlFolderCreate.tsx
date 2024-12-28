"use client";

import React from "react";
import ControlInput from "./ControlInput";
import { FolderI } from "@/lib/firebaseTypes";
import "../styles/folder-create.css";
import { v4 } from "uuid";
import { useAppContext } from "@/lib/AppContext";

const initialFolderData: FolderI = {
  name: "",
  images: [],
  isDefault: false,
  createdAt: new Date().toISOString(),
  showInPortfolio: false,
  description: "",
  id: v4(),
  public: false,
};

export default function ControlFolderCreate() {
  const { createFolder } = useAppContext();
  const [newFolderData, setNewFolderData] = React.useState(initialFolderData);

  const handleChange = (
    key: keyof FolderI,
    value: string | boolean | number
  ) => {
    setNewFolderData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFolder(newFolderData);
    setNewFolderData(initialFolderData);
  };

  return (
    <form className="create-folder" onSubmit={handleSubmit}>
      <ControlInput
        id="create-folder__name"
        onChange={(v) => handleChange("name", v)}
        label="Nazwa folderu"
        required={true}
      />
      <ControlInput
        id="create-folder__description"
        onChange={(v) => handleChange("description", v)}
        label="Opis"
      />
      <ControlInput
        id="create-folder__date"
        onChange={(v) => handleChange("createdAt", v)}
        label="Data zdjęć"
        type="date"
      />
      <ControlInput
        id="create-folder__public"
        onChange={(v) => handleChange("public", v)}
        label="Folder publiczny"
        type="checkbox"
      />
      <ControlInput
        id="create-folder__portfolio"
        onChange={(v) => handleChange("showInPortfolio", v)}
        label="Wyodrębnij w portfolio"
        type="checkbox"
        disabled={!newFolderData.public}
      />
      <div className="create-folder__buttons">
        <button className="control__button" type="submit">
          Utwórz
        </button>
        <button className="control__button" type="reset">
          Wyczyść
        </button>
      </div>
    </form>
  );
}
