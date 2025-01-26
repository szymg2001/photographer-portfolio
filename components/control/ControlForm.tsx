import React from "react";

interface ControlFormI<T> {
  children: (props: {
    handleChange: (key: keyof T, val: string | number | boolean) => void;
  }) => React.ReactNode;
  initialValue: T;
  onSubmit: (formData: T) => void | Promise<void>;
}

export default function ControlForm<T>({
  initialValue,
  children,
  onSubmit,
}: ControlFormI<T>) {
  const [formData, setFormData] = React.useState<T>(initialValue);
  const [formError, setFormError] = React.useState<string>("");

  const handleChange = (key: keyof T, val: string | number | boolean) => {
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
  };

  return (
    <form className="control-form" onSubmit={handleSubmit}>
      {children({ handleChange })}
      <p className="control-form__error-message">{formError}</p>
      <button type="submit">Zatwierdź</button>
    </form>
  );
}
