"use client";

import ManagePhoto from "@/components/control/photos/ManagePhoto";
import ControlSubpage from "@/components/control/subpage/ControlSubpage";
import { useAppContext } from "@/lib/AppContext";
import { ImgI } from "@/lib/firebaseTypes";
import Image from "next/image";
import React from "react";
import "@/styles/control/control-photos.css";

export default function ControlPhotos() {
  const { imgs } = useAppContext();
  const [managingPhoto, setManagingPhoto] = React.useState<ImgI>(imgs[0]);

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSelect = (i: ImgI) => {
    setManagingPhoto(i);
    openModal();
  };

  return (
    <ControlSubpage title="Wszystkie zdjęcia">
      <dialog ref={dialogRef} className="dialog-element">
        <ManagePhoto
          {...managingPhoto}
          onClose={() => {
            closeModal();
          }}
        />
      </dialog>
      <div className="control-photos">
        {imgs.map((i) => (
          <Image
            key={`Zdjęcje: ${i.id}`}
            alt={`Zdjęcie: ${i.id}`}
            src={i.url}
            width={300}
            height={300}
            className="control-photos__image"
            onClick={() => handleSelect(i)}
          />
        ))}
      </div>
    </ControlSubpage>
  );
}
