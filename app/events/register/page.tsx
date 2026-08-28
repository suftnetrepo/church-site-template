'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { CheckCircle2 } from 'lucide-react';

function EventRegisterForm() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event') ?? '';

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventId, ...form })
      });
      if (!res.ok) throw new Error('Registration failed. Please try again.');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <PageHeader eyebrow="Events" title="Register" description="Save your spot — it only takes a moment." />

      <section className="px-8 py-16">
        <div className="max-w-[520px] mx-auto bg-paper border border-ink/10 rounded-lg p-8">
          {success ? (
            <div className="flex items-center gap-2 bg-sage-soft text-sage rounded-md px-4 py-3 text-sm font-medium">
              <CheckCircle2 size={18} />
              You&apos;re registered — we&apos;ll see you there.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && <div className="bg-red-50 text-red-700 rounded-md px-4 py-3 text-sm font-medium">{error}</div>}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-gold text-indigo-deep font-semibold text-sm px-10 py-3 rounded-full hover:bg-[#c8933a] disabled:opacity-60"
              >
                {submitting ? 'Registering…' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default function EventRegisterPage() {
  return (
    <Suspense>
      <EventRegisterForm />
    </Suspense>
  );
}
