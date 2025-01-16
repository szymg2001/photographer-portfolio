import Link from "next/link";
import React from "react";
import "@/styles/control/control.css";
import Heading from "@/components/Heading";

export default function ControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="control">
      <Heading value="Panel Zarządzania" />
      {children}
    </div>
  );
}
