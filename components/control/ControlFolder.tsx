"use client";

import { useAppContext } from "@/lib/AppContext";
import { FolderI } from "@/lib/firebaseTypes";
import Link from "next/link";
import React from "react";

interface ControlFolderI {
  data: FolderI;
}

export default function ControlFolder({ data }: ControlFolderI) {
  const { removeFolder } = useAppContext();
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleRemoveFolder = async (folderId: string) => {
    let confirm = window.confirm("Na pewno chcesz usunąć ten folder?");

    if (confirm) {
      try {
        await removeFolder(folderId);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="control-folder">
      <div className="control-folder__head">
        <p className="control-folder__name">{data.name}</p>
        <Link className="general__link" href={`control/edit/${data.id}`}>
          Edytuj
        </Link>
        <span
          className="general__link"
          onClick={() => handleRemoveFolder(data.id)}
        >
          Usuń
        </span>
        <p className="error-message">{errorMessage}</p>
      </div>
      <p className="control-folder__description">{data.description}</p>
      <p className="control-folder__info">
        Wyodrębniony w portfolio:{" "}
        <span className="control-folder__info__mark">
          {data.showInPortfolio ? "Tak" : "Nie"}
        </span>
      </p>
      <p className="control-folder__info">
        Folder publiczny {`(Widoczny np. w ostatnich folderach)`}:{" "}
        <span className="control-folder__info__mark">
          {data.public ? "Tak" : "Nie"}
        </span>
      </p>
      <p className="control-folder__info">
        Liczba zdjęć:{" "}
        <span className="control-folder__info__mark">
          {`${data.images.length}${data.imgLimit ? `/${data.imgLimit}` : ""}`}
        </span>
      </p>
    </div>
  );
}
