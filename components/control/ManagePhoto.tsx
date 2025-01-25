"use client";

import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";
import React from "react";

export default function ManagePhoto({
  id,
  url,
  onClose,
}: {
  id: string;
  url: string;
  onClose: () => void;
}) {
  const { folders, removeImg, removeImgFromFolder } = useAppContext();
  const foldersList = React.useMemo(() => {
    return folders
      .filter((f) => f.images.some((val) => val === id))
      .map((f) => ({
        id: f.id,
        name: f.name,
      }));
  }, [folders, id]);

  const handleRemove = () => {
    if (foldersList)
      return window.alert(
        "Usuń zdjęcie z folderów przed całkowitym usunięciem."
      );
    const confirmed = window.confirm("Na pewno chcesz usunąć to zdjęcie?");

    if (confirmed) {
      removeImg(url);
    }
  };

  return (
    <div className="manage-photo">
      <span className="control__link manage-photo__close" onClick={onClose}>
        Zamknij
      </span>
      <Image
        className="manage-photo__img"
        width={300}
        height={300}
        alt="Zdjęcie do zarządzania"
        src={url}
      />
      <p className="manage-photo__paragraph-id">
        id: <span>{id}</span>
      </p>
      <p className="manage-photo__paragraph">Foldery, w których występuje:</p>
      <ul className="manage-photo__folders-list">
        {foldersList.map((f, index) => (
          <li className="manage-photo__folder" key={index}>
            <p className="manage-photo__folder-name">{f.name}</p>
            <button
              className="manage-photo__folder-button"
              onClick={() => removeImgFromFolder(id, f.id)}
            >
              Usuń z folderu
            </button>
          </li>
        ))}
      </ul>
      <div className="manage-photo__menu" onClick={handleRemove}>
        <button>Usuń zdjęcie</button>
      </div>
    </div>
  );
}
