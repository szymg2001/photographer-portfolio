"use client";

import React from "react";
import CornerBox from "../../CornerBox";
import "@/styles/homepage/contactpart.css";
import ContactInput from "./ContactInput";
import { useInView } from "motion/react";

export default function ContactPart() {
  const [formData, setFormData] = React.useState({
    name: "",
    message: "",
    contact: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Wiadomość została wysłana!");
      } else {
        const errorData = await response.json();
        alert(`Błąd podczas wysyłania: ${errorData.error}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formRef = React.useRef(null);
  const inView = useInView(formRef);

  return (
    <div className="contact-part" id="contact-section">
      <h6 className={`contact-part__title ${inView && "--contactInView"}`}>
        Opowiedz mi o <span>Swojej Wizji</span>.
      </h6>
      <CornerBox>
        <div className="contact-part__wrapper">
          <form className="contact-part__form" onSubmit={handleSubmit}>
            <div className="contact-part__form__row">
              <ContactInput
                label="Jak mam się do Ciebie zwracać?"
                placeholder="Wprowadź Swoje imię"
                onChange={(v) => setFormData((prev) => ({ ...prev, name: v }))}
                id="contact-input__name"
                number={1}
              />
              <ContactInput
                label="Jak mogę się z Tobą skontaktować?"
                placeholder="Wprowadź swój adres e-mail"
                onChange={(v) =>
                  setFormData((prev) => ({ ...prev, contact: v }))
                }
                id="contact-input__email"
                number={2}
                type="email"
              />
            </div>
            <div className="contact-part__form__row" ref={formRef}>
              <ContactInput
                label="W czym mogę Ci pomóc?"
                placeholder="Wprowadź swoją wiadomość"
                id="contact-input__message"
                number={3}
                onChange={(v) =>
                  setFormData((prev) => ({ ...prev, message: v }))
                }
              />
            </div>
            <button type="submit" className="contact-part__submit">
              Wyślij wiadomość
              <img src="/arrow-contact.svg" alt="arrow svg" />
            </button>
            <img src="/chat.svg" className="contact-part__svg" />
          </form>

          {/* <img src="/chat.svg" className="contact-part__icon" />
          <p className="contact-part__text">Let's talk!</p>
          <p className="contact-part__subtitle">Available entire Poland</p>
          <div className="contact-part__contact-details">
            <div className="contact-info">
              <img src="/mail.svg" className="contact-info__icon" />
              <p className="contact-info__text">emailadress@email.com</p>
            </div>
            <div className="contact-info">
              <img src="/phone.svg" className="contact-info__icon" />
              <p className="contact-info__text">+48 123 456 789</p>
            </div>
          </div> */}
        </div>
      </CornerBox>
    </div>
  );
}
