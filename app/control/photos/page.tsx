"use client";

import ManagePhoto from "@/components/control/ManagePhoto";
import { useAppContext } from "@/lib/AppContext";
import { ImgI } from "@/lib/firebaseTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ControlPhotos() {
  const [managingPhoto, setManagingPhoto] = React.useState<ImgI | null>(null);
  const { imgs } = useAppContext();

  return (
    <div className="control-photos">
      {managingPhoto && <ManagePhoto {...managingPhoto} />}
      <Link className="control-photos__back-link" href="/control">
        Wróć
      </Link>
      <div className="control-photos__images">
        {imgs.map((i) => (
          <Image
            key={`Zdjęcje: ${i.id}`}
            alt={`Zdjęcie: ${i.id}`}
            src={i.url}
            width={300}
            height={300}
            className="control-photos__image"
            onClick={() => setManagingPhoto(i)}
          />
        ))}
      </div>
    </div>
  );
}
