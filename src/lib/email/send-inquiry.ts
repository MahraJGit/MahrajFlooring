import nodemailer from "nodemailer";

import { site } from "@/content/site";

export type InquiryField = {
  label: string;
  value: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function receivedAt() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date());
}

function textBody(source: string, when: string, fields: InquiryField[]) {
  const lines = [
    "Mahraj Flooring",
    "",
    `A visitor submitted the ${source} form on mahrajflooring.com.`,
    `Received: ${when} (Dubai)`,
    "",
    ...fields.map((field) => `${field.label}: ${field.value || "—"}`),
    "",
    "Reply to this email to reach the customer directly.",
  ];
  return lines.join("\n");
}

function htmlBody(source: string, when: string, fields: InquiryField[]) {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <td style="padding:12px 14px;width:34%;border-bottom:1px solid #eee;font-size:13px;font-weight:700;color:#5c5c5c;vertical-align:top;">${escapeHtml(field.label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #eee;font-size:15px;color:#1a1a1a;vertical-align:top;white-space:pre-wrap;">${escapeHtml(field.value || "—")}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e6e6e6;">
            <tr>
              <td style="background:#c8102e;padding:22px 28px;color:#ffffff;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;">Mahraj Flooring</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;margin-top:8px;">New website submission</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0;font-size:15px;line-height:1.5;">A visitor submitted the <strong>${escapeHtml(source)}</strong> form.</p>
                <p style="margin:8px 0 0;font-size:13px;color:#666;">Received ${escapeHtml(when)} (Dubai time)</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;font-family:Arial,Helvetica,sans-serif;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#fafafa;border-top:1px solid #eee;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#666;">
                Reply to this message to contact the customer. This copy was sent to ${escapeHtml(site.inquiryEmail)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendInquiryEmail(input: {
  subject: string;
  source: string;
  replyTo?: string;
  fields: InquiryField[];
}) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    console.error(
      "Inquiry email was not sent because SMTP_HOST, SMTP_USER, or SMTP_PASSWORD is missing."
    );
    return { ok: false as const };
  }

  const when = receivedAt();
  const source = oneLine(input.source).slice(0, 120) || "Website form";
  const fields = input.fields.map((field) => ({
    label: oneLine(field.label).slice(0, 80),
    value: field.value.trim().slice(0, 4000),
  }));

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const from =
    process.env.SMTP_FROM?.trim() || `"Mahraj Flooring" <${user}>`;

  await transport.sendMail({
    from,
    to: site.inquiryEmail,
    replyTo: input.replyTo,
    subject: oneLine(input.subject).slice(0, 180),
    text: textBody(source, when, fields),
    html: htmlBody(source, when, fields),
  });

  return { ok: true as const };
}
