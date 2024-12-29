"use client";

import ControlSection from "./components/ControlSection";
import "./styles/control.css";
import ControlFolderForm from "./components/ControlFolderForm";
import { useAppContext } from "@/lib/AppContext";
import ControlFolder from "./components/ControlFolder";
import { initialFolderData } from "@/lib/firebaseTypes";

export default function ControlPage() {
  const { folders, createFolder } = useAppContext();
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
    </>
  );
}
