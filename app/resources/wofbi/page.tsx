'use client';

import { useState, type FormEvent } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { requireFeature } from '@/lib/features';
import { Home, DollarSign, RefreshCw, MapPin, CheckCircle2 } from 'lucide-react';

const campuses = [
  { value: 'birmingham', label: 'Birmingham Campus', dates: '5th – 10th August' },
  { value: 'dunford', label: 'Dunford Campus', dates: '19th – 25th August' },
  { value: 'coventry', label: 'Coventry Campus', dates: '26th – 31st August' },
  { value: 'leicester', label: 'Leicester Campus', dates: '21st – 26th October' }
];

export default function WofbiPage() {
  requireFeature('wofbi');

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', campus: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/email/wofbi-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Registration failed. Please try again.');
      setSuccess(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', campus: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <PageHeader
        eyebrow="Resources · WOFBI"
        title="Basic Certificate Course"
        description="Transform your life through deep spiritual enlightenment."
      />

      <section className="px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-paper border border-ink/10 rounded-lg p-8 sm:p-10 mb-6">
            <h2 className="text-2xl mb-4">Where do you need help?</h2>
            <p className="font-semibold text-ink mb-4">
              Are you <span className="text-gold-deep">depressed, oppressed, stagnated, and harassed</span> by life&apos;s challenges?
            </p>
            <p className="text-[15px] text-ink-soft mb-6">
              Is life fuzzy and unpredictable for you? You don&apos;t seem to be in control anymore. You struggle in one area or
              the other — finance, business, health, family, career — and you don&apos;t really seem to understand what is going
              on.
            </p>
            <ul className="flex flex-col gap-4 mb-6">
              <li className="flex gap-3">
                <Home className="text-gold-deep shrink-0 mt-0.5" size={18} />
                <span className="text-[14.5px] text-ink-soft">
                  <strong className="text-ink">Is your home and family</strong> far from being at peace?
                </span>
              </li>
              <li className="flex gap-3">
                <DollarSign className="text-gold-deep shrink-0 mt-0.5" size={18} />
                <span className="text-[14.5px] text-ink-soft">
                  <strong className="text-ink">Are you in debt?</strong> Is money an issue? Are bills piling up and you don&apos;t
                  know what to do?
                </span>
              </li>
              <li className="flex gap-3">
                <RefreshCw className="text-gold-deep shrink-0 mt-0.5" size={18} />
                <span className="text-[14.5px] text-ink-soft">
                  <strong className="text-ink">Are you tired of failing every now and then?</strong> Circling back to where you
                  started from, or feeling stuck at the same spot?
                </span>
              </li>
            </ul>
            <div className="bg-gold-pale text-ink-soft text-[14px] rounded-md p-4">
              <strong className="text-ink">At WOFBI,</strong> we do not offer mere secular education; we also provide{' '}
              <strong className="text-ink">deep spiritual enlightenment</strong>, as well as mental{' '}
              <strong className="text-ink">empowerment for exploits</strong>.
            </div>
          </div>

          <h2 className="text-2xl text-center mb-8">Various campuses to choose from</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {campuses.map((campus) => (
              <div key={campus.value} className="bg-paper border border-ink/10 rounded-md p-5 flex gap-3">
                <MapPin className="text-gold-deep shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="font-semibold text-sm">{campus.label}</div>
                  <div className="text-[13.5px] text-ink-soft">{campus.dates}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-[640px] mx-auto bg-paper border border-ink/10 rounded-lg p-8 sm:p-10">
            <h2 className="text-2xl text-center mb-2">Register for WOFBI</h2>
            <p className="text-center text-[14.5px] text-ink-soft mb-8">Take the first step towards transformation today.</p>

            {success && (
              <div className="flex items-center gap-2 bg-sage-soft text-sage rounded-md px-4 py-3 mb-6 text-sm font-medium">
                <CheckCircle2 size={18} />
                Thank you for registering — we&apos;ll be in touch soon.
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
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold mb-1.5">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                </div>
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
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </div>

              <div>
                <label htmlFor="campus" className="block text-sm font-semibold mb-1.5">
                  Select campus
                </label>
                <select
                  id="campus"
                  required
                  value={form.campus}
                  onChange={(e) => setForm((f) => ({ ...f, campus: e.target.value }))}
                  className="w-full border border-ink/15 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-paper"
                >
                  <option value="">Choose a campus…</option>
                  {campuses.map((campus) => (
                    <option key={campus.value} value={`${campus.label} — ${campus.dates}`}>
                      {campus.label} — {campus.dates}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="self-center mt-2 bg-gold text-indigo-deep font-semibold text-sm px-10 py-3 rounded-full hover:bg-[#c8933a] disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
