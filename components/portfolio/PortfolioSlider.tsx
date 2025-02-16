"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FolderI } from "@/lib/firebaseTypes";
import { useAppContext } from "@/lib/AppContext";
import ArrowNav from "../ArrowNav";
import "@/styles/portfolio/portfolio-slider.css";

export default function PortfolioSlider({ data }: { data: FolderI }) {
  const imgRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  const { getImages } = useAppContext();
  const photos = React.useMemo(() => getImages(data.images), [data.images]);
  const [translates, setTranslates] = React.useState<number[]>([]);
  const [scrollLock, setScrollLock] = React.useState(false);

  const handleScroll = (dir: -1 | 1) => {
    if (!sliderRef.current || scrollLock) return;
    setScrollLock(true);

    let targetIndex = -1;
    let imgOffset;
    const slider = sliderRef.current;
    const sliderRect = slider.getBoundingClientRect();

    if (dir === 1) {
      for (let i = 0; i < imgRefs.current.length; i++) {
        if (imgRefs.current && imgRefs.current[i]) {
          imgOffset = imgRefs.current[i]!.offsetLeft;
          if (
            imgOffset >=
            slider.scrollLeft + sliderRect.right - sliderRect.left
          ) {
            targetIndex = i;
            break;
          }
        }
      }
    } else {
      for (let i = imgRefs.current.length; i >= 0; i--) {
        if (imgRefs.current && imgRefs.current[i]) {
          imgOffset = imgRefs.current[i]!.offsetLeft;

          if (imgOffset < slider.scrollLeft) {
            targetIndex = i;
            break;
          }
        }
      }
    }

    if (targetIndex === -1) return;
    imgRefs.current[targetIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  React.useEffect(() => {
    scrollLock &&
      setTimeout(() => {
        setScrollLock(false);
      }, 350);
  }, [scrollLock]);

  React.useEffect(() => {
    sliderRef.current &&
      sliderRef.current.scrollTo({ left: 0, behavior: "instant" });
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
        <ArrowNav onClick={handleScroll} classname="portfolio-slider__nav" />
      </div>
      <div className="portfolio-slider__photos" ref={sliderRef}>
        {photos.map((p, index) => (
          <Image
            className="portfolio-slider__photo"
            style={{
              translate: `0px ${translates[index] || -20}px`,
              animationDelay: `${(index + 1) * 0.15}s`,
            }}
            ref={(e) => {
              imgRefs.current[index] = e;
            }}
            alt={p.id}
            key={p.id}
            src={p.url}
            height={400}
            width={400}
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}

{
  /* <img
  className="portfolio-slider__photo"
  style={{
    translate: `0px ${translates[index] || -20}px`,
    animationDelay: `${(index + 1) * 0.15}s`,
  }}
  ref={(e) => {
    imgRefs.current[index] = e;
  }}
  alt={p.id}
  key={p.id}
  src={p.url}
/> */
}
{
  /* <Image
            className="portfolio-slider__photo"
            style={{
              translate: `0px ${translates[index] || -20}px`,
              animationDelay: `${(index + 1) * 0.15}s`,
            }}
            ref={(e) => {
              imgRefs.current[index] = e;
            }}
            alt={p.id}
            key={p.id}
            src={p.url}
            height={400}
            width={400}
          /> */
}
