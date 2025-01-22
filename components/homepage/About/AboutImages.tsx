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
        initial={{ transform: "translateY(20%) rotate(0deg)", opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        whileInView={{ transform: "translateY(0) rotate(-8deg)", opacity: 1 }}
      >
        <Image
          className="about__image"
          src={photos[0].url}
          alt={`About photo 1`}
          key={photos[0].id}
          width={400}
          height={400}
        />
      </motion.div>
      <motion.div
        className="about__image-wrapper"
        initial={{ transform: "translateY(20%) rotate(0deg)", opacity: 0 }}
        whileInView={{ transform: "translateY(0) rotate(10deg)", opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <Image
          className="about__image"
          src={photos[1].url}
          alt={`About photo 2`}
          key={photos[1].id}
          width={400}
          height={400}
        />
      </motion.div>
    </div>
  );
}
