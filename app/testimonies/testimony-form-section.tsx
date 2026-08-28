'use client';

import { useTestimony } from '@/hooks/use-email';
import { SubmissionForm } from '@/components/forms/submission-form';

export function TestimonyFormSection() {
  const { submit, success, error, submitting } = useTestimony();

  return (
    <SubmissionForm
      submit={submit}
      success={success}
      error={error}
      submitting={submitting}
      messageLabel="Your testimony"
      messagePlaceholder="Tell us what God has done…"
      successMessage="Thank you for sharing — your testimony has been received."
    />
  );
}
