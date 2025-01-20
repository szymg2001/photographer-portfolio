import { useAppContext } from "@/lib/AppContext";
import "@/styles/control/auth-form.css";
import React from "react";

export default function AuthForm() {
  const { handleLogin, authError } = useAppContext();
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let res = await handleLogin(formData.email, formData.password);
    console.log(res);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <p className="auth-form__heading">
        Aby przejść dalej, musisz się najpierw zalogować.
      </p>
      <label htmlFor="auth-form__email" className="auth-form__label">
        Adres e-mail:
      </label>
      <input
        type="email"
        className="auth-form__input"
        id="auth-form__email"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <label htmlFor="auth-form__password" className="auth-form__label">
        Hasło:{" "}
      </label>
      <input
        type="password"
        className="auth-form__input"
        id="auth-form__password"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <p className="auth-form__error">{authError}</p>
      <button type="submit" className="auth-form__submit">
        Zaloguj
      </button>
    </form>
  );
}
