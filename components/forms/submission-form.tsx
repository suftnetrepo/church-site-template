'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

type SubmitFn = (payload: { firstName: string; lastName: string; email: string; message: string }) => Promise<void>;

export function SubmissionForm({
  submit,
  success,
  error,
  submitting,
  messageLabel,
  messagePlaceholder,
  successMessage
}: {
  submit: SubmitFn;
  success: boolean;
  error: string | null;
  submitting: boolean;
  messageLabel: string;
  messagePlaceholder: string;
  successMessage: string;
}) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required.';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.message.trim()) errs.message = 'This field is required.';
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    await submit(form);
    setForm({ firstName: '', lastName: '', email: '', message: '' });
  }

  return (
    <div className="bg-paper border border-ink/10 rounded-lg p-8 sm:p-10 max-w-[640px] mx-auto">
      {success && (
        <div className="flex items-center gap-2 bg-sage-soft text-sage rounded-md px-4 py-3 mb-6 text-sm font-medium">
          <CheckCircle2 size={18} />
          {successMessage}
        </div>
      )}
      {error && <div className="bg-red-50 text-red-700 rounded-md px-4 py-3 mb-6 text-sm font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold mb-1.5">
              First name
            </label>
            <input
              id="firstName"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="Jane"
              className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            {fieldErrors.firstName && <p className="text-xs text-red-600 mt-1.5">{fieldErrors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold mb-1.5">
              Last name
            </label>
            <input
              id="lastName"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Doe"
              className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            {fieldErrors.lastName && <p className="text-xs text-red-600 mt-1.5">{fieldErrors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="jane.doe@example.com"
            className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
          {fieldErrors.email && <p className="text-xs text-red-600 mt-1.5">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1.5">
            {messageLabel}
          </label>
          <textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={messagePlaceholder}
            className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
          {fieldErrors.message && <p className="text-xs text-red-600 mt-1.5">{fieldErrors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-center mt-2 bg-gold text-indigo-deep font-semibold text-sm px-10 py-3 rounded-full hover:bg-[#c8933a] disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
