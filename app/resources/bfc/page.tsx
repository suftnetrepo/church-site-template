import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { requireFeature } from '@/lib/features';

export const metadata: Metadata = {
  title: 'Believers Foundation Class',
  description: 'Building on unshakable foundations, contending for the faith once delivered.'
};

export default function BfcPage() {
  requireFeature('bfc');

  return (
    <main>
      <PageHeader
        eyebrow="Resources"
        title="Believers Foundation Class"
        description="Building on unshakable foundations, contending for the faith once delivered."
      />

      <section className="bg-paper-alt px-8 py-20">
        <div className="max-w-[640px] mx-auto">
          <blockquote className="font-display italic text-2xl leading-[1.5] text-ink text-center mb-14">
            &ldquo;If the foundations are destroyed, what can the righteous do?&rdquo;
            <span className="block mt-4 not-italic font-mono text-[11px] tracking-[0.12em] uppercase text-gold-deep">Psalm 11:3</span>
          </blockquote>

          <div className="flex flex-col gap-6 text-[16px] text-ink-soft leading-[1.85]">
            <p>
              In the journey of life, foundations are vitally important to destiny. To make the most of one&apos;s Christian
              adventure, it is important to address the foundations of the faith. We are admonished to{' '}
              <span className="text-ink font-medium">contend for the faith that was once delivered to the saints</span>
              <sup className="text-gold-deep font-mono text-[11px] not-italic ml-0.5">Jude 3</sup>. This means there is an
              unadulterated dimension of faith — a walk with God that is as God originally intended.
            </p>
            <p>
              The purpose of the Believers Foundation Class is to ensure that we are all grounded in the foundations of faith
              that will ensure a profitable and colorful adventure in the Lord.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-alt border-t border-ink/10 px-8 py-16 text-center">
        <div className="max-w-[520px] mx-auto">
          <div className="eyebrow text-gold-deep mb-3">Every Tuesday · 7pm</div>
          <h2 className="text-2xl text-ink mb-3">Join the foundation class</h2>
          <p className="text-[15px] text-ink-soft mb-8">
            See how to connect with the blessings that come from building your life on solid ground.
          </p>
          <Button href="/contact">Join us</Button>
        </div>
      </section>
    </main>
  );
}
