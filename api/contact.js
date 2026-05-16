const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";

const MAX_FIELD_LENGTH = 2000;

const json = (response, statusCode, payload) => {
    response.status(statusCode).json(payload);
};

const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalizeField = (value) => String(value || "").trim().slice(0, MAX_FIELD_LENGTH);

const parseBody = (request) => {
    if (!request.body) return {};

    if (typeof request.body === "string") {
        try {
            return JSON.parse(request.body);
        } catch {
            return {};
        }
    }

    return request.body;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildEmailHtml = ({ name, email, phone, message, pageUrl }) => `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717;max-width:640px">
        <h1 style="margin:0 0 18px;font-size:24px">New ITOMER website request</h1>

        <table style="width:100%;border-collapse:collapse">
            <tr>
                <td style="padding:10px;border:1px solid #e5e5e5;background:#f7f2eb;font-weight:700;width:140px">Name</td>
                <td style="padding:10px;border:1px solid #e5e5e5">${escapeHtml(name)}</td>
            </tr>
            <tr>
                <td style="padding:10px;border:1px solid #e5e5e5;background:#f7f2eb;font-weight:700">Email</td>
                <td style="padding:10px;border:1px solid #e5e5e5">${escapeHtml(email)}</td>
            </tr>
            <tr>
                <td style="padding:10px;border:1px solid #e5e5e5;background:#f7f2eb;font-weight:700">Phone</td>
                <td style="padding:10px;border:1px solid #e5e5e5">${escapeHtml(phone)}</td>
            </tr>
            <tr>
                <td style="padding:10px;border:1px solid #e5e5e5;background:#f7f2eb;font-weight:700;vertical-align:top">Message</td>
                <td style="padding:10px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(message)}</td>
            </tr>
            ${pageUrl ? `
                <tr>
                    <td style="padding:10px;border:1px solid #e5e5e5;background:#f7f2eb;font-weight:700">Page</td>
                    <td style="padding:10px;border:1px solid #e5e5e5">${escapeHtml(pageUrl)}</td>
                </tr>
            ` : ""}
        </table>
    </div>
`;

export default async function handler(request, response) {
    if (request.method === "OPTIONS") {
        response.setHeader("Allow", "POST, OPTIONS");
        return response.status(204).end();
    }

    if (request.method !== "POST") {
        response.setHeader("Allow", "POST, OPTIONS");
        return json(response, 405, { error: "Method not allowed" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.CONTACT_EMAIL_TO;
    const emailFrom = process.env.CONTACT_EMAIL_FROM;

    if (!apiKey || !emailTo || !emailFrom) {
        return json(response, 500, { error: "Email service is not configured" });
    }

    const body = parseBody(request);

    if (body.company) {
        return json(response, 200, { ok: true });
    }

    const name = normalizeField(body.name);
    const email = normalizeField(body.email);
    const phone = normalizeField(body.phone);
    const message = normalizeField(body.message);
    const pageUrl = normalizeField(body.pageUrl);

    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!isValidEmail(email)) errors.email = "Enter a valid email";
    if (!phone) errors.phone = "Phone is required";
    if (!message) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
        return json(response, 400, { error: "Validation failed", errors });
    }

    try {
        const resendResponse = await fetch(RESEND_EMAILS_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: emailFrom,
                to: [emailTo],
                reply_to: email,
                subject: `New ITOMER request from ${name}`,
                html: buildEmailHtml({ name, email, phone, message, pageUrl }),
                text: [
                    "New ITOMER website request",
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone}`,
                    `Message: ${message}`,
                    pageUrl ? `Page: ${pageUrl}` : "",
                ].filter(Boolean).join("\n"),
            }),
        });

        const resendData = await resendResponse.json().catch(() => ({}));

        if (!resendResponse.ok) {
            return json(response, 502, {
                error: "Email provider rejected the request",
                details: resendData?.message || resendData?.error || "Unknown Resend error",
            });
        }

        return json(response, 200, { ok: true, id: resendData.id });
    } catch {
        return json(response, 500, { error: "Failed to send request" });
    }
}
