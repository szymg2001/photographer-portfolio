"use client";

import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";
import React, { use } from "react";
import "./styles.css";

export default function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { findFolder, getFolderImagesById } = useAppContext();
  const { id } = use(params);
  const folder = React.useMemo(() => findFolder(id), [id]);
  const photos = React.useMemo(() => getFolderImagesById(id), [id]);

  if (folder === null) {
    return <p className="folder-page__not-found">Nie znaleziono albumu.</p>;
  }

  return (
    <div className="folder-page">
      <div className="folder-page__head">
        <p className="folder-page__name">{folder.name}</p>
      </div>
      <div className="folder-page__images">
        {photos.map((p) => (
          <Image
            className="folder-page__image"
            src={p.url}
            alt={p.id}
            key={p.id}
            width={400}
            height={400}
          />
        ))}
      </div>
    </div>
  );
}
