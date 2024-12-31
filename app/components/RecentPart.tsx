"use client";
import { useAppContext } from "@/lib/AppContext";
import { FolderI } from "@/lib/firebaseTypes";
import React from "react";

/* export function Album({
  title,
  length,
  description,
  date,
  id,
  coverSrc = "https://placehold.co/600x800",
}: AlbumI) {
  return (
    <div className="recent-album">
      <CornerBox color="white" corners={["lb"]}>
        <div className="recent-album__content">
          <div className="recent-album__top">
            <p className="recent-album__date">{date}</p>
            <div className="recent-album__top-line" />
          </div>
          <img src={coverSrc} className="recent-album__cover" />
          <p className="recent-album__title">{title}</p>
          <p className="recent-album__length">{length} photos</p>
          <p className="recent-album__description">{description}</p>
        </div>
      </CornerBox>
    </div>
  );
} */

export default function RecentPart() {
  const { folders } = useAppContext();
  const [data, setData] = React.useState<FolderI[]>([]);
  const [showRange, setShowRange] = React.useState([0, 3]);

  const handleChangeRange = (direction: 1 | -1) => {
    let n = data.length;
  };

  return (
    <div className="recent-part">
      <p className="recent-part__subtitle">My Recent</p>
      <div className="recent-part__header-row">
        <h6 className="recent-part__title">Captures</h6>
        <div className="recent-part__nav">
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>
      <img src="/camera.svg" className="recent-part__icon" />
      <div className="recent-part__albums">
        {data.slice(showRange[0], showRange[1]).map((album) => (
          <Album {...album} />
        ))}
      </div>
    </div>
  );
}
