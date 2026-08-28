import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { TestimonyFormSection } from './testimony-form-section';

export const metadata: Metadata = {
  title: 'Testimonies',
  description: "Celebrate the goodness of God. Share testimonies that reveal God's love, power, and faithfulness."
};

// NOTE: there is currently no GET endpoint on Jerur for approved testimonies —
// only the POST below to submit one. This page shows a couple of manually-curated
// examples until a real "list approved testimonies" endpoint exists.
const featured = [
  {
    quote:
      "I walked in during the hardest season of my life. This church didn't just pray for me — they stood with me until I could stand on my own.",
    name: 'A member of our church family'
  }
];

export default function TestimoniesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Testimonies"
        title="Celebrate the goodness of God"
        description="Share testimonies that reveal God's love, power, and faithfulness."
      />

      {featured.length > 0 && (
        <section className="px-8 py-16 bg-paper-alt">
          <div className="max-w-[720px] mx-auto flex flex-col gap-6">
            {featured.map((item, i) => (
              <blockquote key={i} className="font-display italic text-xl leading-relaxed text-ink border-l-2 border-gold pl-6">
                &ldquo;{item.quote}&rdquo;
                <footer className="text-[13.5px] not-italic font-sans text-ink-soft font-medium mt-3">— {item.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="px-8 py-[70px]">
        <div className="text-center max-w-[600px] mx-auto mb-10">
          <p className="text-base font-semibold">Have a testimony to share? We&apos;d love to hear it!</p>
        </div>
        <TestimonyFormSection />
      </section>
    </main>
  );
}
