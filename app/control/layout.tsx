"use client";

import React from "react";
import "@/styles/control/control.css";
import Heading from "@/components/Heading";
import { useAppContext } from "@/lib/AppContext";
import AuthForm from "@/components/control/AuthForm";

export default function ControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, handleLogout } = useAppContext();
  return (
    <div className="control">
      <Heading value="Panel Zarządzania" />
      {user ? children : <AuthForm />}
      <div className="control__bottom-menu">
        <span className="control__link" onClick={handleLogout}>
          Wyloguj
        </span>
      </div>
    </div>
  );
}
