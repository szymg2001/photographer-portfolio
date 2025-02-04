import { ImgI } from "@/lib/firebaseTypes";
import Image from "next/image";

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
          <Image
            src={p.url}
            alt="Menu photo"
            className="hero-menu__element__photo"
            width={150}
            height={220}
          />
          <div className="hero-menu__element__hover">
            <img className="hero-menu__element__hover-svg" src="/eye.svg" />
          </div>
        </div>
      ))}
    </div>
  );
}
