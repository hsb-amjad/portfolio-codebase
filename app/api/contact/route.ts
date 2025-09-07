import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, email, location, message } = await req.json();

    // Transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // ✅ your Gmail address
        pass: process.env.GMAIL_PASS, // ✅ App Password (not your normal password)
      },
    });

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "haseebamjad447@gmail.com",
      subject: "📬 New Portfolio Contact Form Submission",
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Location: ${location}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}