import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { FaqAccordion } from '@/components/faq/accordion';
import { Button } from '@/components/ui/button';
import { churchConfig } from '@/church.config';

export const metadata: Metadata = {
  title: 'New Here',
  description: "We're excited to meet you. Discover what to expect and how to get connected."
};

const faqItems = [
  { question: 'How long are the services?', answer: 'Sunday and midweek services are 90 minutes long.' },
  {
    question: 'What are the service times?',
    answer: 'We run services every Sunday at 9:00 and 11:00. On Wednesdays, our midweek service starts at 19:00.'
  },
  {
    question: 'Who is Jesus Christ?',
    answer:
      'Jesus is the son of God, who came into the world to die for you and me, so that we could have a relationship with our Father God. John 3:16 says: "For God so loved the world that He gave His only begotten son, that whosoever believes in Him shall not perish but have everlasting life."'
  },
  {
    question: 'What if I need prayer or counselling?',
    answer: "There are pastors available to counsel and pray with you after every service. Just speak to an usher and they'll be happy to direct you."
  },
  {
    question: 'Do you provide childcare?',
    answer: "Yes — our children's church (ages 2–12) and teens church (ages 13–19) run alongside every main service."
  },
  {
    question: 'Where can I park?',
    answer: `Free parking is available on-site at ${churchConfig.address.line1}. Friendly ushers will be there to guide you as you arrive.`
  }
];

export default function NewHerePage() {
  return (
    <main>
      <PageHeader
        eyebrow="New here?"
        title="You're welcome here."
        description="We're excited to meet you. Discover what to expect and how to get connected."
      />

      <section className="px-8 py-[90px]">
        <FaqAccordion items={faqItems} />
      </section>

      <section className="bg-paper-alt text-center px-8 py-16">
        <div className="max-w-[560px] mx-auto">
          <div className="eyebrow text-gold-deep mb-3.5">Still have questions?</div>
          <h3 className="text-2xl mb-2.5">We&apos;d love to hear from you</h3>
          <p className="text-[15px] text-ink-soft mb-6">Reach out and someone from our team will get back to you before Sunday.</p>
          <div className="flex gap-3 justify-center">
            <Button href="/contact">Contact us</Button>
            <Button href="/service-times" variant="outline-light">
              See service times
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
