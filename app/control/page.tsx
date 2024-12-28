"use client";

import Link from "next/link";
import ControlSection from "./components/ControlSection";
import "./styles/control.css";
import ControlFolderCreate from "./components/ControlFolderCreate";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "./components/ControlFolder";

export default function ControlPage() {
  const { folders } = useAppContext();
  return (
    <div className="control">
      <div className="control__head">
        <h1 className="control__heading">Panel Zarządzania</h1>
        <Link className="control__link" href="/">
          Wróć do strony głównej
        </Link>
      </div>
      <ControlSection title="Stwórz nowy folder">
        <ControlFolderCreate />
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
    </div>
  );
}
