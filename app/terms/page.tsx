import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = { title: 'Terms' };

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms" description="Terms and conditions for using this website." />
      <section className="px-8 py-16">
        <div className="max-w-[720px] mx-auto text-[15px] text-ink-soft leading-relaxed">
          <p>Replace this placeholder with your church&apos;s real terms and conditions before launch.</p>
        </div>
      </section>
    </main>
  );
}
