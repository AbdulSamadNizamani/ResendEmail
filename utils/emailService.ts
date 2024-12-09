import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const Owner_Email = process.env.Owner_Email;

export const sendEmail = async (subject: string, html: string) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required");
  }
  if (!Owner_Email) {
    throw new Error("Owner_Email is required");
  }
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: Owner_Email,
    subject,
    html,
  });
  if (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
  return data;
};
