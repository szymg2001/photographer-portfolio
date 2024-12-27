"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";
import HeroPartMenu from "./HeroPartMenu";
import HeroPhoto from "./HeroPhoto";
import "../styles/heropart.css";

export default function HeroPart() {
  const { getFolderImages } = useAppContext();
  const heroPhotos = React.useMemo(() => getFolderImages("heroPhotos"), []);
  const [selected, setSelected] = React.useState(0);

  return (
    <div className="hero">
      <div className="hero__text">
        <p className="hero__text__capture">Capture your every</p>
        <h1 className="hero__text__header">BEAUTIFUL MOMENT.</h1>
        <p className="hero__text__header-desc">Photographer with a passion</p>
        <p className="hero__text__description">
          Przykładowy tekstprzykładowy tekstprzykładowy tekstprzykładowy tekst
          rzykładowy tekstprzykładowy tekst rzykładowy tekstprzykładowy
          tekstPrzykładowy tekstprzykładowy tekstprzykładowy tekstprzykładowy
          tekst rzykładowy tekstprzykładowy tekst rzykładowy tekstprzykładowy
          tekst
        </p>
      </div>
      <HeroPartMenu onSelect={(i) => setSelected(i)} photos={heroPhotos} />
      <HeroPhoto src={heroPhotos[selected].url} />
    </div>
  );
}
