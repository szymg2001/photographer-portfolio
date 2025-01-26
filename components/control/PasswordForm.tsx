"use client";

import { auth } from "@/lib/firebase";
import ControlInput from "./ControlInput";
import React from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAppContext } from "@/lib/AppContext";
import ControlForm from "./ControlForm";

const initialFormData = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PasswordForm() {
  const { handleLogout } = useAppContext();

  const handleSubmit = async (formData: typeof initialFormData) => {
    const { newPassword, oldPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword)
      throw new Error("Nowe hasła różnią się.");

    const user = auth.currentUser;
    if (!user || !user.email)
      throw new Error("Użytkownik nie jest poprawnie zalogowany.");

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    handleLogout();
  };

  return (
    <ControlForm onSubmit={handleSubmit} initialValue={initialFormData}>
      {({ handleChange }) => (
        <>
          <ControlInput
            label="Stare hasło"
            id="password-form__oldPassword"
            type="password"
            onChange={(v) => handleChange("oldPassword", v)}
          />
          <ControlInput
            label="Nowe hasło"
            id="password-form__newPassword"
            type="password"
            onChange={(v) => handleChange("newPassword", v)}
          />
          <ControlInput
            label="Potwierdź nowe hasło"
            id="password-form__confirmPassword"
            type="password"
            onChange={(v) => handleChange("confirmPassword", v)}
          />
        </>
      )}
    </ControlForm>
  );
}
