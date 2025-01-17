"use client";
import { useAppContext } from "@/lib/AppContext";
import React from "react";
import ArrowNav from "../ArrowNav";
import "@/styles/homepage/recentpart.css";
import Link from "next/link";

export default function RecentPart() {
  const { folders, getImages } = useAppContext();
  const [showRange, setShowRange] = React.useState([0, 2]);

  const handleChangeRange = (direction: 1 | -1) => {
    let n = recentFolders.length;
    if (direction === 1 && showRange[1] > n - 1) return;
    if (direction === -1 && showRange[0] === 0) return;

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
        <ArrowNav onClick={() => {}} />
      </div>
      {recentFolders.slice(showRange[0], showRange[1]).map((rf, index) => (
        <div
          key={rf.id}
          className={`recent__folder ${
            index % 2 !== 0 ? "recent__folder--reversed" : ""
          }`}
        >
          <p className="recent__folder__name">{rf.name}</p>
          {getImages(rf.images.slice(0, 3)).map((i, index) => (
            <img
              src={i.url}
              alt={`${rf.name} - ${i.id}`}
              className={`recent__folder__img`}
              style={{ gridArea: `img${index}` }}
              key={i.id}
            />
          ))}
          <p className="recent__folder__description">{rf.description}</p>
          <Link className="recent__folder__see-more" href={`/folder/${rf.id}`}>
            <p className="recent__folder__see-more__text">
              Zobacz Cały Katalog
            </p>
            <img src="/arrowMore.svg" alt="see more" />
          </Link>
        </div>
      ))}
    </div>
  );
  /* return (
    <div className="recent">
      <p className="recent__subtitle">My Recent</p>
      <div className="recent__head">
        <h6 className="recent__title">Captures</h6>
        <ArrowNav
          onClick={(d) => handleChangeRange(d)}
          classname="recent__nav"
        />
      </div>
      <img src="/camera.svg" className="recent__icon" />
      <div className="recent__folders">
        {recentFolders.slice(showRange[0], showRange[1]).map((rf) => (
          <SingleFolder folder={rf} key={rf.id} />
        ))}
      </div>
    </div>
  ); */
}

/* <div key={rf.id} className="recent-folder">
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
          </div> */
