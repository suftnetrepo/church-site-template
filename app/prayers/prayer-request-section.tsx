'use client';

import { usePrayerRequest } from '@/hooks/use-email';
import { SubmissionForm } from '@/components/forms/submission-form';

export function PrayerRequestSection() {
  const { submit, success, error, submitting } = usePrayerRequest();

  return (
    <SubmissionForm
      submit={submit}
      success={success}
      error={error}
      submitting={submitting}
      messageLabel="Your prayer request"
      messagePlaceholder="Describe your prayer request — whether for healing, guidance, provision, or thanksgiving…"
      successMessage="Your prayer request has been received. We'll be praying with you."
    />
  );
}
