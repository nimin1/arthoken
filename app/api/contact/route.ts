import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The contact endpoint.
 *
 * This used to be a `mailto:` handoff, which meant nothing was ever sent
 * from the site and the form reported success regardless. Every message
 * now goes through a real provider server-side, and the form is only
 * told it succeeded when the provider confirms it.
 *
 * Configuration, both set in the hosting environment:
 *   RESEND_API_KEY   the provider key
 *   CONTACT_TO       where enquiries land, defaults to site.email
 *   CONTACT_FROM     a verified sender on your domain
 */
const TO = process.env.CONTACT_TO || site.email;
const FROM = process.env.CONTACT_FROM || `Arthoken site <onboarding@resend.dev>`;
const KEY = process.env.RESEND_API_KEY;

/** Small in-memory throttle. Enough to blunt a naive script. */
const hits = new Map<string, number[]>();
const WINDOW = 60_000;
const MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();
  return recent.length > MAX;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited" },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const str = (k: string) => String(body[k] ?? "").trim();
  const name = str("name");
  const organization = str("organization");
  const email = str("email");
  const problem = str("problem");

  // A field no person can see and no person will fill in.
  if (str("company_url")) {
    return NextResponse.json({ ok: true });
  }

  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    problem.length < 20 ||
    name.length > 200 ||
    organization.length > 200 ||
    email.length > 320 ||
    problem.length > 8000
  ) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 422 });
  }

  // Without a provider key the honest answer is that we could not send,
  // never that we did. The form shows the address so the lead survives.
  if (!KEY) {
    console.error("[contact] RESEND_API_KEY is not set. Enquiry not sent:", {
      name,
      organization,
      email,
    });
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 }
    );
  }

  const subject = `Enquiry from ${organization || name}`;
  const text = [
    `Name: ${name}`,
    `Organization: ${organization || "not given"}`,
    `Email: ${email}`,
    "",
    problem,
  ].join("\n");

  const html = `<div style="font:15px/1.6 -apple-system,Segoe UI,sans-serif;color:#0c1215">
  <p style="margin:0 0 4px"><strong>Name</strong> ${esc(name)}</p>
  <p style="margin:0 0 4px"><strong>Organization</strong> ${esc(organization || "not given")}</p>
  <p style="margin:0 0 16px"><strong>Email</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
  <hr style="border:0;border-top:1px solid #e5e5e0;margin:16px 0">
  <p style="margin:0;white-space:pre-wrap">${esc(problem)}</p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] provider rejected the send:", res.status, await res.text());
      return NextResponse.json({ ok: false, reason: "provider" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send threw:", error);
    return NextResponse.json({ ok: false, reason: "network" }, { status: 502 });
  }
}
