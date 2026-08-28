import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { FoodBankIllustration } from '@/components/illustrations/food-bank-illustration';
import { requireFeature } from '@/lib/features';
import { churchConfig } from '@/church.config';
import { ShoppingBasket, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Food Bank',
  description: 'Support the food bank. Every gift, however small, can make a real difference.'
};

// Reference implementation for a "food bank" style community program —
// disabled by default (see church.config.ts). Enable it and replace the
// placeholder copy/contact details below with the real program details for
// a church that actually runs one.
export default function FoodBankPage() {
  requireFeature('foodBank');

  return (
    <main>
      <PageHeader
        eyebrow="Community · Food bank"
        title="It only takes a little to make a lot"
        description="Every gift, however small, can make a real difference to a family in need."
      />

      <section className="px-8 py-[90px]">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div className="aspect-[4/5] rounded-lg border border-ink/10 overflow-hidden">
            <FoodBankIllustration large />
          </div>
          <div>
            <div className="eyebrow text-sage mb-3.5">How it works</div>
            <h2 className="text-[30px] mb-5">Support the {churchConfig.shortName} food bank</h2>
            <p className="text-base text-ink-soft mb-8">
              [Replace with the real schedule and location — e.g. "Every third Sunday, we extend a hand of hope through our
              food bank at {churchConfig.address.line1}."] Your generous donation helps fill bags with essential food items
              for those in need.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] shrink-0 rounded-full bg-sage-soft text-sage flex items-center justify-center">
                  <ShoppingBasket size={18} />
                </div>
                <div>
                  <h4 className="text-base font-semibold font-sans mb-1.5">Bring essential non-perishable food items</h4>
                  <p className="text-[14.5px] text-ink-soft">
                    Such as rice, pasta, tinned foods, cereals, and toiletries — dropped off directly at the church.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] shrink-0 rounded-full bg-sage-soft text-sage flex items-center justify-center">
                  <Landmark size={18} />
                </div>
                <div>
                  <h4 className="text-base font-semibold font-sans mb-1.5">Or give financially</h4>
                  <p className="text-[14.5px] text-ink-soft">
                    Speak to any church official, or contact us via{' '}
                    <a href="tel:00000000000" className="text-gold-deep font-semibold">
                      [phone number]
                    </a>{' '}
                    to arrange your donation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage-soft text-center px-8 py-14">
        <div className="max-w-[600px] mx-auto">
          <div className="eyebrow text-sage mb-3.5">This week</div>
          <h3 className="text-2xl mb-2.5">Bring a bag, change a family&apos;s week</h3>
          <p className="text-[15px] text-ink-soft mb-6">
            [Replace with the real collection schedule and location, e.g. "{churchConfig.address.line1}, {churchConfig.address.line2}."]
          </p>
          <a href="/service-times" className="inline-flex items-center gap-2 text-sm font-semibold px-[22px] py-[11px] rounded-[3px] bg-sage text-white hover:bg-sage/90">
            See service times
          </a>
        </div>
      </section>
    </main>
  );
}
