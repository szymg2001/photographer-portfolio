import React from "react";

interface ControlInputI {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  onChange: (value: string | boolean | number) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function ControlInput({
  id,
  label,
  type = "text",
  disabled = false,
  onChange,
  required = false,
}: ControlInputI) {
  return (
    <div
      className={`control-input ${
        type === "checkbox" ? "control-input__checkbox-input" : ""
      }`}
    >
      <label
        htmlFor={id}
        className={`control-input__label ${
          disabled ? "control-input__disabled" : ""
        }`}
      >
        {label}
      </label>
      <input
        required={required}
        id={id}
        onChange={(event) =>
          onChange(
            type === "checkbox" ? event.target.checked : event.target.value
          )
        }
        type={type}
        className="control-input__input-element"
        disabled={disabled}
      />
    </div>
  );
}
