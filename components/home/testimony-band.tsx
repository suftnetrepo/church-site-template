import Link from 'next/link';

// NOTE: Jerur currently exposes no GET endpoint for approved testimonies —
// only /api/email/testimony to submit one. Until that read endpoint exists,
// this is manually-curated static content. Swap for a real fetch once available.
export function TestimonyBand() {
  return (
    <section className="bg-indigo text-white text-center px-8 py-[90px]">
      <div className="max-w-[720px] mx-auto">
        <div className="eyebrow text-gold mb-[26px]">Testimony</div>
        <blockquote className="font-display italic text-2xl lg:text-[26px] leading-[1.5] text-[#F3F1EA] mb-[22px]">
          &ldquo;I walked in during the hardest season of my life. This church didn&apos;t just pray for me — they stood with me until I
          could stand on my own.&rdquo;
        </blockquote>
        <div className="text-[13.5px] text-[#9AA0BC] mb-[30px]">— A member of our church family</div>
        <Link href="/testimonies" className="text-[13.5px] font-semibold text-gold border-b border-gold pb-[3px]">
          Read more testimonies →
        </Link>
      </div>
    </section>
  );
}
