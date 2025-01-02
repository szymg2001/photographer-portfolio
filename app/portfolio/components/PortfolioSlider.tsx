"use client";
import ArrowNav from "@/app/components/ArrowNav";
import { FolderI } from "@/lib/firebaseTypes";
import Link from "next/link";

import "../styles/portfolio-slider.css";
import React from "react";
import { useAppContext } from "@/lib/AppContext";
import Image from "next/image";

export default function PortfolioSlider({ data }: { data: FolderI }) {
  const { getImages } = useAppContext();
  const photos = React.useMemo(() => getImages(data.images), [data.images]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [translates, setTranslates] = React.useState<number[]>([]);

  const getRandomTranslate = (index: number) => {
    let even = index % 2 === 0;
    let value = Math.floor(Math.random() * 20) + 10;
    return even ? value * -1 : value;
  };

  React.useEffect(() => {
    setTranslates(
      photos.map((_, index) => {
        const even = index % 2 === 0;
        const value = Math.floor(Math.random() * 20) + 10;
        return even ? value * -1 : value;
      })
    );
  }, [photos]);

  return (
    <div className="portfolio-slider">
      <div className="portfolio-slider__head">
        <div className="portfolio-slider__head-name">
          <p className="portfolio-slider__name">{data.name}</p>
          <Link href="/">See full</Link>
        </div>
        <ArrowNav onClick={(d) => {}} classname="portfolio-slider__nav" />
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
