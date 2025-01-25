"use client";

import React from "react";
import ControlInput from "./ControlInput";
import { FolderFormI, FolderI } from "@/lib/firebaseTypes";
import "@/styles/control/folder-create.css";

interface ControlFolderFormI {
  data: FolderFormI;
  onSubmit: (data: FolderFormI) => void;
  onCancel?: () => void;
  cancelMessage?: string;
}

export default function ControlFolderForm({
  data,
  onSubmit,
  onCancel,
  cancelMessage = "Anuluj",
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
        defaultValue={folderData.name}
      />
      <ControlInput
        id="create-folder__description"
        onChange={(v) => handleChange("description", v)}
        label="Opis"
        defaultValue={folderData.description}
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
        defaultChecked={folderData.public}
      />
      <ControlInput
        id="create-folder__portfolio"
        onChange={(v) => handleChange("showInPortfolio", v)}
        label="Wyodrębnij w portfolio"
        type="checkbox"
        disabled={!folderData.public}
        defaultChecked={folderData.showInPortfolio}
      />
      <div className="create-folder__buttons">
        <button className="control__button" type="submit">
          Zapisz
        </button>
        {onCancel && (
          <button className="control__button" onClick={onCancel}>
            {cancelMessage}
          </button>
        )}
      </div>
    </form>
  );
}
