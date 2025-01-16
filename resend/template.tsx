import React from "react";

interface EmailTemplateI {
  name: string;
  contact: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateI>> = ({
  name,
  message,
  contact,
}): React.ReactNode => {
  return (
    <div>
      <h1>Nowa wiadomość</h1>
      <p>Od: {name}</p>
      <br />
      <br />
      <p>{message}</p>
      <br />
      <p>Kontakt: {contact}</p>
    </div>
  );
};
