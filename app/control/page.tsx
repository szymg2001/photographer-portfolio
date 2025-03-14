"use client";

import React from "react";
import "@/styles/control/control.css";
import ControlMenuButton from "@/components/control/ControlMenuButton";
import ControlSection from "@/components/control/ControlSection";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "@/components/control/ControlFolder";
import ControlPortfolioOrder from "@/components/control/ControlPortfolioOrder";

export default function ControlPage() {
  const { folders } = useAppContext();

  return (
    <div className="control-wrapper">
      <div className="control-menu">
        <ControlMenuButton name="Utwórz folder" url="/control/folder/0" />
        <ControlMenuButton
          name="Dodaj zdjęcia"
          url="/control/upload"
          iconName="upload"
        />
        <ControlMenuButton
          name="Konto"
          url="/control/account"
          iconName="settings"
        />
        <ControlMenuButton
          name="Wszystkie zdjęcia"
          url="/control/photos"
          iconName="photos"
        />
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
      <ControlSection
        title="Portfolio"
        note="Kolejność wyróżnienia w portfolio od góry do dołu"
      >
        <ControlPortfolioOrder />
      </ControlSection>
    </div>
  );
}
