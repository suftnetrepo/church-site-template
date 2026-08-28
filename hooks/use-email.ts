'use client';

import { useState } from 'react';

type SubmissionPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function useSubmission(endpoint: string) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(payload: SubmissionPayload) {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          message: payload.message
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, success, error, submitting };
}

export const useContactSubmission = () => useSubmission('/api/email/contact-us');
export const usePrayerRequest = () => useSubmission('/api/email/prayer-request');
export const useTestimony = () => useSubmission('/api/email/testimony');
