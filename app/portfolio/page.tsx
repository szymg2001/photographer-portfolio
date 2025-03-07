"use client";

import { useAppContext } from "@/lib/AppContext";
import React from "react";
import { FolderI } from "@/lib/firebaseTypes";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import SingleFolder from "@/components/SingleFolder";

export default function Portfolio() {
  const { folders, settings } = useAppContext();
  const [publicFoldersNum, setPublicFoldersNum] = React.useState(2);
  const [publicFolders, setPublicFolders] = React.useState<FolderI[]>([]);
  const [highlighted, setHighlighted] = React.useState<FolderI[]>([]);

  React.useEffect(() => {
    if (!folders) return;

    let p: FolderI[] = [];
    let h: FolderI[] = [];

    folders.forEach((f) => {
      f.public && p.push(f);
      f.showInPortfolio && h.push(f);
    });

    h.sort(
      (a, b) =>
        settings.portfolioOrder.indexOf(a.id) -
        settings.portfolioOrder.indexOf(b.id)
    );

    setHighlighted(h);
    setPublicFolders(p);
  }, []);

  const handleChangeFoldersNum = () => {
    if (publicFoldersNum > publicFolders.length) return;

    setPublicFoldersNum((prev) => prev + 3);
  };

  return (
    <div className="portfolio">
      <div className="portfolio__highlighted">
        {highlighted.map((h) => (
          <PortfolioSlider data={h} key={h.id} />
        ))}
      </div>
      <div className="portfolio__albums">
        <p className="portfolio__albums-title">Albumy</p>
        <div className="portfolio__albums-list">
          {publicFolders.slice(0, publicFoldersNum).map((f) => (
            <SingleFolder folder={f} key={f.id} />
          ))}
        </div>
        {publicFolders.length > publicFoldersNum && (
          <button
            onClick={handleChangeFoldersNum}
            className="portfolio__albums__show-more"
          >
            Pokaż Więcej
          </button>
        )}
      </div>
    </div>
  );
}
