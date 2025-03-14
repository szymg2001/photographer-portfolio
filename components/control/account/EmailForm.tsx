"use client";
import { auth } from "@/lib/firebase";
import ControlForm from "../ControlForm";
import ControlInput from "../ControlInput";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import React from "react";

const initialFormData = {
  currentEmail: "",
  password: "",
  newEmail: "",
  confirmNewEmail: "",
};
export default function EmailForm() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSubmit = async (data: typeof initialFormData) => {
    const { newEmail, confirmNewEmail, password } = data;

    if (!newEmail || newEmail !== confirmNewEmail)
      throw new Error("Niepoprawne nowe adresy e-mail.");

    const user = auth.currentUser;

    if (!user || !user.email)
      throw new Error("Użytkownik nie jest poprawnie zalogowany.");

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      throw new Error("Niepoprawne hasło.");
    }

    try {
      await verifyBeforeUpdateEmail(user, newEmail, {
        url: window.location.href,
        handleCodeInApp: true,
      });
    } catch (error) {
      throw new Error("Coś poszło nie tak, spróbuj ponownie później.");
    }

    openModal();
  };

  return (
    <ControlForm initialValue={initialFormData} onSubmit={handleSubmit}>
      {({ handleChange }) => (
        <>
          <dialog ref={dialogRef} className="dialog-element">
            Na podany adres wysłany został link z potwierdzeniem. Kliknij go,
            aby zmienić adres e-mail.
          </dialog>
          <ControlInput
            id="email-form__password"
            type="password"
            onChange={(v) => handleChange("password", v)}
            label="Hasło"
          />
          <ControlInput
            id="email-form__new"
            label="Nowy adres e-mail"
            onChange={(v) => handleChange("newEmail", v)}
          />
          <ControlInput
            id="email-form__confirm"
            label="Potwierdź adres e-mail"
            onChange={(v) => handleChange("confirmNewEmail", v)}
          />
        </>
      )}
    </ControlForm>
  );
}
