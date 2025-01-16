"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";
import "@/styles/homepage/heropart.css";
import HeroPartMenu from "./HeroPartMenu";
import HeroPhoto from "./HeroPhoto";
import Link from "next/link";
import Image from "next/image";

export default function HeroPart() {
  const { getFolderImagesByName } = useAppContext();
  const heroPhotos = React.useMemo(
    () => getFolderImagesByName("heroPhotos"),
    []
  );
  const [selected, setSelected] = React.useState(0);

  return (
    <div className="hero">
      <div className="hero__text">
        <p className="hero__text__capture">Uchwyć Swój Każdy</p>
        <h1 className="hero__text__header">Niezapomniany Moment</h1>
        <p className="hero__text__description">
          W kadrach zatrzymuję magię najważniejszych momentów, by nigdy nie
          zniknęła. Moje fotografie są przepełnione emocjami, prawdziwością i
          dbałością o każdy szczegół.
        </p>

        <Link className="hero__text__link" href={"/"}>
          <img src="/arrow.svg" />
          <span>Poznajmy się</span>
        </Link>
      </div>
      <HeroPartMenu onSelect={(i) => setSelected(i)} photos={heroPhotos} />
      <Image
        src={heroPhotos[selected].url}
        alt="Main photo"
        className="hero-photo__img"
        width={550}
        height={870}
      />
      {/* <HeroPhoto src={heroPhotos[selected].url} /> */}
    </div>
  );
}