import React from "react";

export default function useForm<T>(defaultData: T) {
  const [formData, setFormData] = React.useState<T>(defaultData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    const key = name as keyof T;

    setFormData((prev) => ({
      ...prev,
      [key]: type === "checkbox" ? checked : value,
    }));
  };
  return { formData, setFormData, handleChange };
}
