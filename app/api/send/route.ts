import { EmailTemplate } from "@/resend/template";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
  try {
    const { contact, name, message } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "szymon.grabowiec2001@gmail.com",
      subject: "Stronka",
      react: EmailTemplate({ contact, name, message }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
