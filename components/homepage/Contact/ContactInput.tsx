"use client";

interface ContactInputI {
  label: string;
  onChange: (value: string) => void;
  id: string;
  type?: "text" | "email";
  number?: number;
  placeholder?: string;
  textarea?: boolean;
}
export default function ContactInput({
  label,
  id,
  type = "text",
  number,
  onChange,
  placeholder,
  textarea = false,
}: ContactInputI) {
  return (
    <div className="contact-input__wrapper">
      {number && <span className="contact-input__number">{number}.</span>}
      <label className="contact-input__label" htmlFor={id}>
        {label}
      </label>
      <br />
      {textarea ? (
        <textarea
          id={id}
          className="contact-input__textarea"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          className="contact-input__input"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      <div className="contact-input__bottom-line" />
    </div>
  );
}
