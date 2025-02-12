"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FolderI } from "@/lib/firebaseTypes";
import { useAppContext } from "@/lib/AppContext";
import ArrowNav from "../ArrowNav";
import "@/styles/portfolio/portfolio-slider.css";

export default function PortfolioSlider({ data }: { data: FolderI }) {
  const { getImages } = useAppContext();
  const photos = React.useMemo(() => getImages(data.images), [data.images]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [translates, setTranslates] = React.useState<number[]>([]);

  React.useEffect(() => {
    setTranslates(
      photos.map((_, index) => {
        const even = index % 2 === 0;
        const value = Math.floor(Math.random() * 15) + 10;
        return even ? value * -1 : value;
      })
    );
  }, [photos]);

  return (
    <div className="portfolio-slider">
      <div className="portfolio-slider__head">
        <div className="portfolio-slider__head-name">
          <p className="portfolio-slider__name">{data.name}</p>
          <Link href={`/folder/${data.id}`} className="general__link">
            See full
          </Link>
        </div>
        <ArrowNav onClick={() => {}} classname="portfolio-slider__nav" />
      </div>
      <div className="portfolio-slider__photos">
        {photos.map((p, index) => (
          <Image
            className="portfolio-slider__photo"
            style={{
              translate: `0px ${translates[index] || -20}px`,
              animationDelay: `${(index + 1) * 0.15}s`,
            }}
            alt={p.id}
            key={p.id}
            src={p.url}
            height={400}
            width={400}
          />
        ))}
      </div>
    </div>
  );
}
