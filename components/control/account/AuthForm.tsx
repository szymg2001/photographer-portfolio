import { useAppContext } from "@/lib/AppContext";
import useForm from "@/lib/useForm";
import "@/styles/control/auth-form.css";
import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function AuthForm() {
  const [resetPassword, setResetPassword] = React.useState(false);

  const { handleLogin, authError } = useAppContext();
  const { formData, handleChange, setFormData } = useForm({
    email: "",
    password: "",
  });

  let emailRef = React.useRef<HTMLInputElement | null>(null);
  let passRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  React.useLayoutEffect(() => {
    if (emailRef.current && passRef.current) {
      setFormData({
        email: emailRef.current.value,
        password: passRef.current.value,
      });
    }
  }, []);

  if (resetPassword)
    return <ResetPasswordForm onBack={() => setResetPassword(false)} />;
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
        name="email"
        defaultValue={formData.email}
        ref={emailRef}
        autoComplete="email"
        onChange={handleChange}
      />
      <label htmlFor="auth-form__password" className="auth-form__label">
        Hasło:{" "}
      </label>
      <input
        type="password"
        name="password"
        className="auth-form__input"
        id="auth-form__password"
        defaultValue={formData.password}
        ref={passRef}
        autoComplete="current-password"
        onChange={handleChange}
      />
      <p className="auth-form__error">{authError}</p>
      <button type="submit" className="auth-form__submit">
        Zaloguj
      </button>
      <p className="general__link" onClick={() => setResetPassword(true)}>
        Przypomnij Hasło
      </p>
    </form>
  );
}
