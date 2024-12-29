"use client";

import ControlSection from "./components/ControlSection";
import "./styles/control.css";
import ControlFolderForm from "./components/ControlFolderForm";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "./components/ControlFolder";
import { FolderI, initialFolderData } from "@/lib/firebaseTypes";
import React from "react";

export default function ControlPage() {
  const { folders, createFolder, settings, changePortfolioOrder } =
    useAppContext();

  const orderedPortfolioFolders = React.useMemo(() => {
    return folders
      .filter((f) => f.showInPortfolio)
      .sort(
        (a, b) =>
          settings.portfolioOrder.indexOf(a.id) -
          settings.portfolioOrder.indexOf(b.id)
      );
  }, [settings.portfolioOrder]);

  return (
    <>
      <ControlSection title="Stwórz nowy folder">
        <ControlFolderForm
          data={initialFolderData}
          onSubmit={(data) => createFolder(data)}
        />
      </ControlSection>
      <ControlSection
        note="Foldery wymagane do poprawnego działania strony."
        title="Foldery domyślne"
      >
        {folders
          .filter((f) => f.isDefault)
          .map((f) => (
            <ControlFolder data={f} key={f.id} />
          ))}
      </ControlSection>
      <ControlSection title="Pozostałe foldery">
        {folders
          .filter((f) => !f.isDefault)
          .map((f) => (
            <ControlFolder data={f} key={f.id} />
          ))}
      </ControlSection>
      <ControlSection title="Porfolio" note="Kolejność wyodrębnionych folderów">
        <ol className="control__portfolio-order">
          {orderedPortfolioFolders.map((f, index) => (
            <li className="control__portfolio-order__element">
              <img
                src="/expand.svg"
                className="control__portfolio-order__change-order"
                onClick={() => changePortfolioOrder(-1, index)}
              />
              <img
                src="/expand.svg"
                className="control__portfolio-order__change-order"
                onClick={() => changePortfolioOrder(1, index)}
              />
              <p className="control__portfolio-order__name">{f.name}</p>
            </li>
          ))}
        </ol>
      </ControlSection>
    </>
  );
}
