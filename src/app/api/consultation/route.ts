import { NextResponse } from "next/server";

// Consultation requests. Wire `deliver()` to your mail provider (Resend, Postmark, SMTP) or CRM.
async function deliver(payload: Record<string, string>) {
  console.info("[consultation]", JSON.stringify(payload));
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
    organisation: s("organisation"),
    interest: s("interest"),
    message: s("message", 4000),
  };

  if (!payload.name) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!EMAIL.test(payload.email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });

  await deliver(payload);
  return NextResponse.json({ ok: true });
}
