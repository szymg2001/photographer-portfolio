"use client";

import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";
import React from "react";

export default function ManagePhoto({ id, url }: { id: string; url: string }) {
  const { folders, removeImg } = useAppContext();
  const foldersList = React.useMemo(() => {
    return folders
      .filter((f) => f.images.some((val) => val === id))
      .map((f) => ({
        id: f.id,
        name: f.name,
      }));
  }, [folders, id]);

  const handleRemove = () => {
    const confirmed = window.confirm("Na pewno chcesz usunąć to zdjęcie?");
    if (confirmed) {
      removeImg(url);
    }
  };

  const handleRemovingFromFolder = (id: string) => {};

  return (
    <div className="manage-photo">
      <Image width={300} height={300} alt="Zdjęcie do zarządzania" src={url} />
      <p className="manage-photo__paragraph">
        identyfikator: <span>{id}</span>
      </p>
      <p className="manage-photo__paragraph">Foldery w których występuje:</p>
      <ul className="manage-photo__folders-list">
        {foldersList.map((f, index) => (
          <li className="manage-photo__folder" key={index}>
            <p className="manage-photo__folder-name">{f.name}</p>
            <button
              className="manage-photo__folder-button"
              onClick={() => handleRemovingFromFolder(f.id)}
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
