import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { BankTransferCard } from './bank-transfer-card';
import { hasFeature } from '@/lib/features';
import { CloudCog, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Give',
  description: 'When you give your tithe and offering, you unlock kingdom blessings — prepare for divine provision.'
};

export default function GivePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Giving"
        title="Covenant of blessing"
        description="When you give your tithe and offering, you unlock kingdom blessings — prepare for divine provision."
      />

      <section className="px-8 py-[90px]">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-[54px]">
            <div className="eyebrow text-gold-deep mb-3.5">Three ways to give</div>
            <h2 className="text-[30px]">Choose what works for you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
            <div className="bg-paper border border-ink/10 rounded-md p-8">
              <div className="w-11 h-11 rounded-full bg-gold-pale text-gold-deep flex items-center justify-center mb-[22px]">
                <CloudCog size={20} />
              </div>
              <h3 className="text-lg font-semibold font-sans mb-2.5">Give online</h3>
              <p className="text-[14.5px] text-ink-soft">Via the Tithe.ly app or website. It's quick, easy, and secure.</p>
              <a href="https://giving.winners-chapel.org.uk/" className="inline-block mt-4 text-[13px] font-semibold text-gold-deep border-b border-gold">
                Give via Online →
              </a>
            </div>

            <BankTransferCard />

            <div className="bg-paper border border-ink/10 rounded-md p-8">
              <div className="w-11 h-11 rounded-full bg-gold-pale text-gold-deep flex items-center justify-center mb-[22px]">
                <Mail size={20} />
              </div>
              <h3 className="text-lg font-semibold font-sans mb-2.5">Use a giving envelope</h3>
              <p className="text-[14.5px] text-ink-soft">
                Available during any of our services — you'll find these at the back of the church.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo text-white text-center px-8 py-[70px]">
        <div className="max-w-[640px] mx-auto">
          <div className="eyebrow text-gold mb-5">Every gift matters</div>
          <blockquote className="font-display italic text-xl lg:text-[23px] leading-[1.5] text-[#F3F1EA] mb-[30px]">
            &ldquo;Give, and it will be given to you.&rdquo; Your tithes and offerings fund our worship and our outreach in the
            community.
          </blockquote>
          <div className="flex gap-3.5 justify-center">
            {hasFeature('foodBank') && (
              <Button href="/food-bank" variant="outline-dark">
                See our food bank
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
