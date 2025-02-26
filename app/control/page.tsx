"use client";

import React from "react";
import "@/styles/control/control.css";
import ControlMenuButton from "@/components/control/ControlMenuButton";
import ControlSection from "@/components/control/ControlSection";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "@/components/control/ControlFolder";

export default function ControlPage() {
  const { folders } = useAppContext();
  return (
    <div className="control-wrapper">
      <div className="control-menu">
        <ControlMenuButton name="Utwórz folder" url="/control/folder/0" />
        <ControlMenuButton name="Dodaj zdjęcia" url="#" iconName="upload" />
        <ControlMenuButton name="Konto" url="#" iconName="settings" />
        <ControlMenuButton name="Wszystkie zdjęcia" url="#" iconName="photos" />
      </div>
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
    </div>
  );
}

/* "use client";

import ControlSection from "@/components/control/ControlSection";
import "@/styles/control/control.css";
import ControlFolderForm from "@/components/control/ControlFolderForm";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "@/components/control/ControlFolder";
import { initialFolderData } from "@/lib/firebaseTypes";
import React from "react";
import PasswordForm from "@/components/control/PasswordForm";
import ControlFileUpload from "@/components/control/ControlFileUpload";

export default function ControlPage() {
  const {
    folders,
    createFolder,
    settings,
    changePortfolioOrder,
    uploadImages,
  } = useAppContext();

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
      <ControlSection
        title="Porfolio"
        note="Kolejność wyodrębnionych folderów w portfolio"
      >
        <ol className="control__portfolio-order">
          {orderedPortfolioFolders.map((f, index) => (
            <li className="control__portfolio-order__element" key={index}>
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
      <ControlSection title="Prześlij zdjęcia">
        <ControlFileUpload />
      </ControlSection>
      <ControlSection title="Zarządzaj kontem">
        <ControlSection title="Zmień hasło">
          <PasswordForm />
        </ControlSection>
      </ControlSection>
    </>
  );
}
 */
