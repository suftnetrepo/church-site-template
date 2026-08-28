'use client';

import { useContactSubmission } from '@/hooks/use-email';
import { SubmissionForm } from '@/components/forms/submission-form';

export function ContactFormSection() {
  const { submit, success, error, submitting } = useContactSubmission();

  return (
    <SubmissionForm
      submit={submit}
      success={success}
      error={error}
      submitting={submitting}
      messageLabel="Message"
      messagePlaceholder="Your message"
      successMessage="Thanks for reaching out — we'll be in touch soon."
    />
  );
}
