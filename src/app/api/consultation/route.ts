import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { site } from "@/content/site";

/**
 * Consultation requests, emailed to MonaCare with Nodemailer through MonaCare's own mail server.
 * Set on Vercel: SMTP_USER and SMTP_PASS (the website's mailbox), and optionally SMTP_HOST
 * (default admin.9sonic.co.uk, the 9Sonic mail server behind mail.monacare.co.uk; its certificate is for that name), SMTP_PORT (default 465), CONSULTATION_TO (default: the site email).
 * Until the mailbox is set up nothing can be delivered, so the form says so and offers WhatsApp or
 * email instead of pretending the request was sent.
 */
export const runtime = "nodejs";

async function deliver(p: Record<string, string>) {
  const { SMTP_USER: user, SMTP_PASS: pass } = process.env;
  if (!user || !pass) return false;
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "admin.9sonic.co.uk",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  try {
    await transport.sendMail({
      from: `MonaCare website <${user}>`,
      to: process.env.CONSULTATION_TO || site.email,
      replyTo: { name: p.name, address: p.email },
      subject: `Consultation request from ${p.name}`,
      text: [
        `Name: ${p.name}`,
        `Email: ${p.email}`,
        `Phone: ${p.phone || "-"}`,
        `Organisation: ${p.organisation || "-"}`,
        `Area of interest: ${p.interest || "-"}`,
        "",
        p.message || "(no message)",
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[consultation] delivery failed", err);
    return false;
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — silently accept bots
  if (typeof body.company_site === "string" && body.company_site.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const s = (k: string, max = 200) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const payload = {
    name: s("name"),
    email: s("email"),
    phone: s("phone", 40),
    organisation: s("organisation"),
    interest: s("interest"),
    message: s("message", 4000),
  };

  if (!payload.name) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!EMAIL.test(payload.email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });

  if (!(await deliver(payload))) {
    return NextResponse.json(
      { error: "We couldn't send your request online just now. Please send it on WhatsApp or by email instead.", fallback: true },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
