import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { TeamGrid } from "./team-grid";
import { churchConfig } from "@/church.config";

export const metadata: Metadata = {
  title: "About",
  description: churchConfig.tagline,
};

// Placeholder narrative — replace every paragraph below with this church's
// real story before launch. The two-column layout (story + portrait) and
// the team grid underneath are the reusable part; the words are not.
export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="Who we are"
        description={churchConfig.tagline}
      />

      <section className="px-8 py-20">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <div className="eyebrow text-gold-deep mb-4">Our story</div>
            <h2 className="text-[30px] mb-6 max-w-[480px]">
              Welcome to {churchConfig.name}.
            </h2>
            <div className="flex flex-col gap-5 text-[15.5px] text-ink-soft leading-[1.85]">
              <p>
                [Replace this paragraph with your church&apos;s real story — who you are, what you believe, and what brought
                your church into being.]
              </p>
              <p>
                [Add a second paragraph here — your history, milestones, or anything a first-time visitor would want to know
                about where you&apos;ve come from.]
              </p>
              <p>
                We are glad you have come to this website. Take time to browse through the site, and join any of our services
                — we would love to meet you.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] mx-auto w-full max-w-[380px] rounded-lg overflow-hidden bg-gradient-to-br from-sage-soft via-paper-alt to-gold-pale">
            <Image
              src="/blank.png"
              alt="Add a photo of your church leadership here"
              fill
              sizes="380px"
              className="object-cover opacity-0"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.5),transparent_45%)]" />
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center max-w-[560px] mx-auto mb-14">
            <div className="eyebrow text-gold-deep mb-3.5">Leadership</div>
            <h2 className="text-[30px]">Meet the team</h2>
          </div>
          <TeamGrid />
        </div>
      </section>
    </main>
  );
}
