import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/page-header';
import { ContactFormSection } from './contact-form-section';
import { ContactInfo } from './contact-info';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Got any questions? Don't hesitate to get in touch."
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader eyebrow="Contact" title="Got any questions?" description="Don't hesitate to get in touch — we'd love to hear from you." />

      <section className="px-8 py-[90px]">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10">
          <ContactInfo />
          <ContactFormSection />
        </div>
      </section>
    </main>
  );
}
