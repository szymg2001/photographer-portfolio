"use client";

import { useAppContext } from "@/lib/AppContext";
import useForm from "@/lib/useForm";
import React from "react";

export default function ResetPasswordForm({ onBack }: { onBack: () => void }) {
  const { handleChange, formData } = useForm({ email: "" });
  const { resetPassword } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(formData.email);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="auth-form__email" className="auth-form__label">
        Adres e-mail:
      </label>
      <input
        type="email"
        className="auth-form__input"
        id="auth-form__email"
        name="email"
        defaultValue={formData.email}
        autoComplete="email"
        onChange={handleChange}
      />
      <button className="auth-form__submit">Wyślij przypomnienie</button>
      <p className="general__link" onClick={onBack}>
        Wróć do logowania
      </p>
    </form>
  );
}
