import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "szymon.grabowiec2001@gmail.com",
    subject: "Hello World",
    react: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
/* export default async (req:NextApiRequest, res: NextApiResponse) => {
    const {data, error} = await resend
} */
