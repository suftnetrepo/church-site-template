import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { requireFeature } from '@/lib/features';
import { Car, Receipt, RefreshCcw, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Transport',
  description: "Book a taxi, bring the receipt, and we'll refund your fare — it's that simple."
};

const steps = [
  {
    icon: Car,
    title: 'Book your taxi',
    description: 'Arrange your own taxi to attend the service at a time that suits you best.'
  },
  {
    icon: Receipt,
    title: 'Pay the fare',
    description: 'Pay the taxi driver as usual and make sure to ask for a printed or digital receipt.'
  },
  {
    icon: RefreshCcw,
    title: 'Submit your receipt',
    description: "Give us your taxi receipt after the service and we'll fully refund your fare."
  },
  {
    icon: Phone,
    title: 'Need help?',
    description: 'If you need assistance with booking or claiming, call [phone number].'
  }
];

export default function FreeTransportPage() {
  requireFeature('freeTransport');

  return (
    <main>
      <PageHeader
        eyebrow="Getting here"
        title="Need a ride? We've got you!"
        description="Book a taxi, bring the receipt, and we'll refund your fare — it's that simple."
      />

      <section className="px-8 py-16">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-center eyebrow text-ink-soft mb-2">How it works</h2>
          <h3 className="text-2xl text-center mb-12">Here are the simple steps to get free transport to church.</h3>

          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.title} className="flex gap-5">
                <div className="w-11 h-11 shrink-0 rounded-full bg-gold-pale text-gold-deep flex items-center justify-center">
                  <step.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-base mb-1.5">{step.title}</h4>
                  <p className="text-[14.5px] text-ink-soft">
                    {step.title === 'Need help?' ? (
                      <>
                        If you need assistance with booking or claiming, call{' '}
                        <a href="tel:00000000000" className="text-gold-deep font-semibold">
                          [phone number]
                        </a>
                        .
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
