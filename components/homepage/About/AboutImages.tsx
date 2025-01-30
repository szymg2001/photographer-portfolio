"use client";

import { useAppContext } from "@/lib/AppContext";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

export default function AboutImages() {
  const { getFolderImages } = useAppContext();
  const photos = React.useMemo(() => {
    let photosArray = getFolderImages("aboutPhotos", "name");
    return Array(2)
      .fill(null)
      .map(
        (_, index) =>
          photosArray[index] ?? {
            id: "PLACEHOLDER",
            url: "https://placehold.co/600x800",
          }
      );
  }, [getFolderImages]);

  return (
    <div className="about__images">
      <motion.div
        className="about__image-wrapper"
        initial={{
          transform: "translateY(20%) rotate(0deg) translateX(-100%)",
          opacity: 0,
        }}
        transition={{ duration: 0.55, delay: 0.1 }}
        whileInView={{
          transform: "translateY(0) rotate(-8deg) translateX(-100%)",
          opacity: 1,
        }}
      >
        <Image
          className="about__image"
          src={photos[0].url}
          alt={`About photo 1`}
          key={photos[0].id}
          fill
        />
      </motion.div>
      <motion.div
        className="about__image-wrapper"
        initial={{
          transform: "translateY(20%) rotate(0deg) translateX(0%)",
          opacity: 0,
        }}
        whileInView={{
          transform: "translateY(0) rotate(10deg) translateX(0%)",
          opacity: 1,
        }}
        transition={{ duration: 0.55 }}
      >
        <Image
          className="about__image"
          src={photos[1].url}
          alt={`About photo 2`}
          key={photos[1].id}
          fill
        />
      </motion.div>
    </div>
  );
}
