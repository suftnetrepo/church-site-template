'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, Landmark, X } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { churchConfig } from '@/church.config';

const REFERENCE = churchConfig.shortName; // Placeholder — replace with this church's actual real bank transfer reference convention

function formatSortCode(value?: string) {
  if (!value) return '—';
  const digits = value.replace(/\D/g, '');
  return digits.match(/.{1,2}/g)?.join('-') ?? value;
}

function formatAccountNumber(value?: string) {
  if (!value) return '—';
  return value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') ?? value;
}

function Field({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — value is still visible to copy manually
    }
  }

  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
      <div>
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8A90AC] mb-1">{label}</div>
        <div className="font-mono text-[16px] tracking-wide text-white">{value}</div>
      </div>
      {copyValue && (
        <button
          onClick={handleCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#C7CBDA] hover:bg-white/5 hover:text-white transition-colors shrink-0"
        >
          {copied ? <Check size={14} className="text-gold" /> : <Copy size={14} />}
        </button>
      )}
    </div>
  );
}

export function BankTransferCard() {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const bankName = settings?.bank_name || 'World Mission Agency';
  const accountName = settings?.name || churchConfig.name;
  const sortCode = settings?.sort_code;
  const accountNumber = settings?.account_number;

  return (
    <>
      <div className="bg-paper border border-ink/10 rounded-md p-8">
        <div className="w-11 h-11 rounded-full bg-gold-pale text-gold-deep flex items-center justify-center mb-[22px]">
          <Landmark size={20} />
        </div>
        <h3 className="text-lg font-semibold font-sans mb-2.5">Bank transfer</h3>
        <p className="text-[14.5px] text-ink-soft">Give directly from your bank using our account details.</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-block mt-4 text-[13px] font-semibold text-gold-deep border-b border-gold"
        >
          View bank details →
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(10,12,24,0.78)] flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-[440px] bg-gradient-to-br from-indigo to-indigo-deep rounded-lg p-8 sm:p-10 relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
            <div
              className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(217,164,65,0.22), transparent 70%)' }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#C7CBDA] hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/10 text-gold flex items-center justify-center mb-5">
                <Landmark size={22} />
              </div>
              <h3 className="font-display text-2xl text-white mb-1.5">Bank transfer</h3>
              <p className="text-[13.5px] text-[#C7CBDA] mb-2">Available during any of our services.</p>

              <div className="mt-4">
                {/* <Field label="Bank name" value={bankName} />
                <Field label="Account name" value={accountName} />
                <Field label="Sort code" value={formatSortCode(sortCode)} copyValue={sortCode} />
                <Field label="Account number" value={formatAccountNumber(accountNumber)} copyValue={accountNumber} />
                <Field label="Reference" value={REFERENCE} copyValue={REFERENCE} /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
