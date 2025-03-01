import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React from "react";

interface ControlFormI<T> {
  children: (props: {
    handleChange: (key: keyof T, val: string | number | boolean) => void;
  }) => React.ReactNode;
  initialValue: T;
  onSubmit: (formData: T) => void | Promise<void>;
  onSuccessMessage?: string;
  redirect?: string;
}

export default function ControlForm<T>({
  initialValue,
  children,
  onSubmit,
  onSuccessMessage = "",
  redirect,
}: ControlFormI<T>) {
  const router = useRouter();
  const [formData, setFormData] = React.useState<T>(initialValue);
  const [formError, setFormError] = React.useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] =
    React.useState<boolean>(false);

  const handleChange = (key: keyof T, val: string | number | boolean) => {
    setShowSuccessMessage(false);
    setFormError("");
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error: any) {
      setFormError(error.message);
    }
    setFormData(initialValue);
    setShowSuccessMessage(true);

    if (redirect) {
      router.push(redirect);
    }
  };

  return (
    <form className="control-form" onSubmit={handleSubmit}>
      {children({ handleChange })}
      <p className="control-form__error-message">{formError}</p>
      <p className="control-form__message">
        {formError && (
          <span className="control-form__message__error">{formError}</span>
        )}
        {showSuccessMessage && (
          <span className="control-form__message__success">
            {onSuccessMessage}
          </span>
        )}
      </p>
      <button type="submit">Zatwierdź</button>
    </form>
  );
}
