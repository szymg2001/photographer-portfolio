"use client";

import Heading from "@/components/Heading";
import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import "@/styles/folderpage/folder-page.css";
import ImgView from "@/components/folder-page/ImgView";
import { ImgI } from "@/lib/firebaseTypes";

export default function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getFolder, getFolderImages } = useAppContext();
  const { id } = use(params);

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const folder = React.useMemo(() => getFolder(id), [id]);
  const photos = React.useMemo(() => getFolderImages(id), [folder, id]);

  const [selectedPhoto, setSelectedPhoto] = React.useState(photos[0].url);

  if (!folder) {
    return (
      <div className="folder-page">
        <p className="folder-page__not-found">Nie znaleziono folderu</p>;
        <Link href="/">Wróć</Link>
      </div>
    );
  }

  const handleSelect = (i: ImgI) => {
    setSelectedPhoto(i.url);
    openDialog();
  };

  return (
    <div className="folder-page">
      <dialog ref={dialogRef} className="dialog-element">
        <ImgView
          src={selectedPhoto}
          onClose={() => {
            closeDialog();
          }}
        />
      </dialog>
      <Heading value={folder.name} />
      <div className="folder-page__details">
        <p className="folder-page__photo-number">
          Ilość zdjęć: <span>{folder.images.length}</span>
        </p>
        <p className="folder-page__date">{folder.createdAt}</p>
      </div>
      <p className="folder-page__description">{folder.description}</p>
      <Link href="/portfolio" className="general__link folder-page__back-url">
        Wróć
      </Link>
      <div className="folder-page__photos">
        {photos.map((p) => (
          <Image
            src={p.url}
            width={300}
            height={300}
            key={p.id}
            alt={`Zdjęcie folderu - ${p.id}`}
            className="folder-page__photo"
            onClick={() => handleSelect(p)}
          />
        ))}
      </div>
    </div>
  );
}
