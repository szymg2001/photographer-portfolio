"use client";
import { useAppContext } from "@/lib/AppContext";
import React from "react";
import ArrowNav from "../ArrowNav";
import "@/styles/homepage/recentpart.css";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function RecentPart() {
  const { folders, getImages } = useAppContext();
  const [showRange, setShowRange] = React.useState([0, 2]);
  const [changeCount, setChangeCount] = React.useState(0);

  const handleChangeRange = (direction: 1 | -1) => {
    let n = recentFolders.length;
    if (direction === 1 && showRange[1] > n - 1) return;
    if (direction === -1 && showRange[0] === 0) return;

    setChangeCount((prev) => (prev += direction));

    direction === 1
      ? setShowRange((prev) => [prev[0] + 2, prev[1] + 2])
      : setShowRange((prev) => [prev[0] - 2, prev[1] - 2]);
  };

  const recentFolders = React.useMemo(
    () => folders.filter((f) => f.public && f.images.length > 2),
    [folders]
  );

  return (
    <div className="recent">
      <div className="recent__head">
        <img src="/camera.svg" className="recent__icon" />
        <p className="recent__heading">Zatrzymane w Obiektywie</p>
        <p className="recent__message">
          "W doskonałej fotografii chodzi o głębię uczucia. O zapisanie Momentu
          wzbogaconego o Wspomnienia i Emocje."
        </p>
        <ArrowNav onClick={(dir) => handleChangeRange(dir)} />
      </div>
      <motion.div
        key={changeCount}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`recent__folders ${
          changeCount % 2 === 1 && "recent__folders--reversed"
        }`}
      >
        {recentFolders.slice(showRange[0], showRange[1]).map((rf, index) => (
          <div
            key={rf.id}
            className={`recent__folder ${
              index % 2 !== 0 ? "recent__folder--reversed" : ""
            }`}
          >
            <p className="recent__folder__name">{rf.name}</p>
            {/* <img
              src={i.url}
              alt={`${rf.name} - ${i.id}`}
              className={`recent__folder__img`}
              style={{ gridArea: `img${index}` }}
              key={i.id}
            /> */}
            {getImages(rf.images.slice(0, 3)).map((i, index) => (
              <Image
                width={400}
                height={400}
                src={i.url}
                alt={`${rf.name} - ${i.id}`}
                className={`recent__folder__img`}
                key={i.id}
                style={{ gridArea: `img${index}` }}
              />
            ))}
            <p className="recent__folder__description">{rf.description}</p>
            <Link
              className="recent__folder__see-more"
              href={`/folder/${rf.id}`}
            >
              <p className="recent__folder__see-more__text">
                Zobacz Cały Katalog
              </p>
              <img src="/arrowMore.svg" alt="see more" />
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
