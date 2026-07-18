import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SITE_CONTACT_EMAIL = "partnerships@chelsea-portland.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "rediffmail.com",
];

function isBusinessEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmed)) {
    return false;
  }

  const domain = trimmed.split("@")[1];
  return Boolean(domain && !PERSONAL_EMAIL_DOMAINS.includes(domain));
}

function buildEmailText(values: {
  fullName: string;
  organisation: string;
  email: string;
  telephone: string;
  message: string;
}) {
  return [
    `Full Name: ${values.fullName}`,
    `Organisation: ${values.organisation}`,
    `Email Address: ${values.email}`,
    `Telephone: ${values.telephone}`,
    "",
    "Message:",
    values.message,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      organisation?: string;
      email?: string;
      telephone?: string;
      message?: string;
    };

    const fullName = String(body.fullName ?? "").trim();
    const organisation = String(body.organisation ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const telephone = String(body.telephone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Please complete the required fields before submitting." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isBusinessEmail(email)) {
      return NextResponse.json(
        {
          error: "Please use your business email address to submit your enquiry.",
        },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user || SITE_CONTACT_EMAIL;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "Email delivery is not configured on this server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `Chelsea Portland Website <${from}>`,
      to: SITE_CONTACT_EMAIL,
      replyTo: email,
      subject: `Website enquiry from ${fullName}`,
      text: buildEmailText({
        fullName,
        organisation,
        email,
        telephone,
        message,
      }),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Organisation:</strong> ${organisation || "-"}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Telephone:</strong> ${telephone || "-"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
