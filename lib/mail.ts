type BrevoRecipient = { email: string; name?: string };

type BrevoMailOptions = {
  sender: BrevoRecipient;
  to: BrevoRecipient[];
  subject: string;
  textContent: string;
  htmlContent: string;
};

export async function sendBrevoEmail(options: BrevoMailOptions) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY ?? ''
    },
    body: JSON.stringify(options)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${body}`);
  }

  return response.json();
}
