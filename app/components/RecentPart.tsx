"use client";
import { useAppContext } from "@/lib/AppContext";
import { FolderI } from "@/lib/firebaseTypes";
import React from "react";
import "../styles/recentpart.css";
import CornerBox from "./CornerBox";

export default function RecentPart() {
  const { folders, getImages } = useAppContext();
  const [showRange, setShowRange] = React.useState([0, 3]);

  const handleChangeRange = (direction: 1 | -1) => {
    let n = recentFolders.length;
    if (direction === 1 && showRange[1] > n - 1) return;
    if (direction === -1 && showRange[0] === 0) return;

    direction === 1
      ? setShowRange((prev) => [prev[0] + 3, prev[1] + 3])
      : setShowRange((prev) => [prev[0] - 3, prev[1] - 3]);
  };

  const recentFolders = React.useMemo(
    () => folders.filter((f) => f.public && f.images.length > 0),
    [folders]
  );

  const getCover = (folder: FolderI): string =>
    folder.coverId
      ? getImages([folder.coverId])[0].url
      : getImages(folder.images)[0].url;
  return (
    <div className="recent">
      <p className="recent__subtitle">My Recent</p>
      <div className="recent__head">
        <h6 className="recent__title">Captures</h6>
        <div className="recent__nav">
          <img
            src="/arrowLeft.svg"
            alt="navigation left"
            className="recent__nav-button"
            onClick={() => handleChangeRange(-1)}
          />
          <img
            src="/arrowRight.svg"
            alt="navigation right"
            className="recent__nav-button"
            onClick={() => handleChangeRange(1)}
          />
        </div>
      </div>
      <img src="/camera.svg" className="recent__icon" />
      <div className="recent__folders">
        {recentFolders.slice(showRange[0], showRange[1]).map((rf) => (
          <div key={rf.id} className="recent-folder">
            <CornerBox color="white" corners={["lb"]}>
              <div className="recent-folder__content">
                <div className="recent-folder__top">
                  <p className="recent-folder__date">{rf.createdAt}</p>
                  <div className="recent-folder__top-line" />
                </div>
                <img src={getCover(rf)} className="recent-folder__cover" />
                <p className="recent-folder__title">{rf.name}</p>
                <p className="recent-folder__length">
                  {rf.images.length} photos
                </p>
                <p className="recent-folder__description">{rf.description}</p>
              </div>
            </CornerBox>
          </div>
        ))}
      </div>
    </div>
  );
}
