"use client";

import React from "react";
import ControlInput from "./ControlInput";
import { FolderI, initialFolderData } from "@/lib/firebaseTypes";
import "../styles/folder-create.css";
import { useAppContext } from "@/lib/AppContext";

interface ControlFolderFormI {
  data: FolderI;
  onSubmit: (data: FolderI) => void;
}

export default function ControlFolderForm({
  data,
  onSubmit,
}: ControlFolderFormI) {
  const [folderData, setFolderData] = React.useState(data);

  const handleChange = (
    key: keyof FolderI,
    value: string | boolean | number
  ) => {
    setFolderData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFolderData(data);
    onSubmit(folderData);
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
        disabled={!folderData.public}
      />
      <div className="create-folder__buttons">
        <button className="control__button" type="submit">
          Zapisz
        </button>
        <button className="control__button" type="reset">
          Wyczyść
        </button>
      </div>
    </form>
  );
}
