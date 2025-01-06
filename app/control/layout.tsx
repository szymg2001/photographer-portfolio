import Link from "next/link";
import React from "react";
import "@/styles/control/control.css";

export default function ControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="control">
      <div className="control__head">
        <h1 className="control__heading">Panel Zarządzania</h1>
        <Link className="control__link" href="/">
          Wróć do strony głównej
        </Link>
      </div>
      {children}
    </div>
  );
}
