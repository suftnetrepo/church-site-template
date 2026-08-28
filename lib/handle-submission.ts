import { NextResponse } from 'next/server';
import { sendBrevoEmail } from '@/lib/mail';
import { emailTemplates } from '@/lib/email-templates';
import { churchConfig } from '@/church.config';

type SubmissionType = 'contactSubmission' | 'prayerRequest' | 'testimonySubmission';

const subjects: Record<SubmissionType, (name: string) => string> = {
  contactSubmission: (name) => `Website inquiry from ${name}`,
  prayerRequest: (name) => `New prayer request: ${name}`,
  testimonySubmission: (name) => `New testimony shared: ${name}`
};

export async function handleSubmission(req: Request, type: SubmissionType) {
  try {
    const body = await req.json();
    const { email, first_name, last_name, message } = body ?? {};

    if (!email || !first_name || !last_name || !message) {
      return NextResponse.json({ error: 'First name, last name, email, and message are required.' }, { status: 400 });
    }

    const html = emailTemplates[type]({
      firstName: first_name,
      lastName: last_name,
      email,
      message,
      teamName: process.env.TEAM
    });

    await sendBrevoEmail({
      sender: { email: process.env.USER_NAME ?? '', name: `${churchConfig.name} website` },
      to: [{ email: process.env.CHURCH_INBOX_EMAIL ?? '' }],
      subject: subjects[type](`${first_name} ${last_name}`),
      textContent: message,
      htmlContent: html
    });

    return NextResponse.json({ data: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
