"use client";

import { useAppContext } from "@/lib/AppContext";
import { useInView, motion } from "motion/react";
import React from "react";

export default function AboutImages() {
  const { getFolderImages } = useAppContext();
  const photos = React.useMemo(() => getPhotos(), []);

  const imgRef1 = React.useRef(null);
  const imgRef2 = React.useRef(null);
  const isInView = useInView(imgRef2, { once: true });

  React.useEffect(() => {}, [isInView]);

  function getPhotos() {
    let photosArray = getFolderImages("aboutPhotos", "name");
    if (photosArray.length !== 2) {
      photosArray = Array(2)
        .fill(null)
        .map((_, index) =>
          photosArray[index]
            ? photosArray[index]
            : { id: "PLACEHOLDER", url: "https://placehold.co/600x800" }
        );
    }

    return photosArray;
  }
  return (
    <div className="about__images">
      <motion.img
        initial={{ transform: "translateY(20%) rotate(0deg)", opacity: 0 }}
        whileInView={{ transform: "translateY(0) rotate(-8deg)", opacity: 1 }}
        className="about__image"
        transition={{ duration: 0.55, delay: 0.1 }}
        src={photos[0].url}
        alt={photos[0].id}
        key={photos[0].id}
        ref={imgRef1}
      />
      <motion.img
        initial={{ transform: "translateY(20%) rotate(0deg)", opacity: 0 }}
        whileInView={{ transform: "translateY(0) rotate(10deg)", opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="about__image"
        src={photos[1].url}
        alt={photos[1].id}
        key={photos[1].id}
        ref={imgRef2}
      />
    </div>
  );
}
