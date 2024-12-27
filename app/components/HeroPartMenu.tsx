"use client";

import { ImgI } from "@/lib/firebaseTypes";

export default function HeroPartMenu({
  onSelect,
  photos,
}: {
  onSelect: (index: number) => void;
  photos: ImgI[];
}) {
  return (
    <div className="hero-menu">
      {photos.map((p, index) => (
        <div
          className="hero-menu__element"
          onClick={() => onSelect(index)}
          key={p.id}
        >
          <img
            src={p.url}
            alt="Menu photo"
            className="hero-menu__element__photo"
          />
          <div className="hero-menu__element__hover">
            <img className="hero-menu__element__hover-svg" /* src={eye} */ />
          </div>
        </div>
      ))}
    </div>
  );
}
