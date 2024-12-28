import Link from "next/link";
import ControlSection from "./components/ControlSection";
import "./styles/control.css";

export default function ControlPage() {
  return (
    <div className="control">
      <div className="control__head">
        <h1 className="control__heading">Panel Zarządzania</h1>
        <Link className="control__link" href="/">
          Wróć do strony głównej
        </Link>
      </div>
      <ControlSection title="Stwórz nowy folder">asd</ControlSection>
    </div>
  );
}
