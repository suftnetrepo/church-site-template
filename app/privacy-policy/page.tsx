import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Privacy policy" description="How we collect, use, and protect your information." />
      <section className="px-8 py-16">
        <div className="max-w-[720px] mx-auto text-[15px] text-ink-soft leading-relaxed">
          <p>Replace this placeholder with your church&apos;s real privacy policy before launch.</p>
        </div>
      </section>
    </main>
  );
}
