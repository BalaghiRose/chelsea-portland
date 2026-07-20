// app/api/contact/route.js  (or pages/api/contact.js, adjust for your router)
import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { fullName, organisation, email, telephone, message } =
    await request.json();

  // basic server-side validation
  if (!fullName || !email || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Chelsea Portland Enquiries <enquiries@chelsea-portland.com>", // must be on the verified domain
      to: ["partnerships@chelsea-portland.com"],
      replyTo: email,
      subject: `New enquiry from ${fullName}`,
      text: `
Name: ${fullName}
Organisation: ${organisation || "-"}
Email: ${email}
Telephone: ${telephone || "-"}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to send enquiry" },
        { status: 500 },
      );
    }

    return Response.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
