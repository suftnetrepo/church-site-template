import Link from "next/link";
import { FellowshipIllustration } from "@/components/illustrations/fellowship-illustration";
import { EventsIllustration } from "@/components/illustrations/events-illustration";
import { FoodBankIllustration } from "@/components/illustrations/food-bank-illustration";
import { hasFeature } from "@/lib/features";

// Uses the hand-built SVG illustrations as the default — brand-agnostic,
// no real photos needed to look intentional. Swap the `Illustration`
// component for a real <Image> per card once a church has photos of their
// own fellowship groups / events / food bank to show instead.
const allCards = [
  {
    title: "Fellowship groups",
    description:
      "Small groups meeting through the week for prayer, Bible study, and friendship.",
    href: "/fellowship",
    cta: "Find a group",
    band: "linear-gradient(135deg,#E8B968,#C4832F)",
    Illustration: FellowshipIllustration,
  },
  {
    title: "Upcoming events",
    description:
      "Conferences, prayer nights, and community days — see what's coming up.",
    href: "/events",
    cta: "View events",
    band: "linear-gradient(135deg,#232C50,#141830)",
    Illustration: EventsIllustration,
  },
  {
    title: "Community food bank",
    description:
      "Practical, no-questions-asked support for families in your community.",
    href: "/food-bank",
    cta: "Learn more",
    band: "linear-gradient(135deg,#71875F,#4A5B40)",
    Illustration: FoodBankIllustration,
    feature: "foodBank" as const,
  },
];

// Filtered once at module scope — church.config.ts doesn't change at
// runtime. A church without the Food Bank feature just gets Fellowship +
// Events here, not a card linking to a 404.
const cards = allCards.filter((card) => !card.feature || hasFeature(card.feature));

export function GetInvolved() {
  return (
    <section className="bg-paper-alt px-8 py-[90px]">
      <div className="max-w-[1160px] mx-auto mb-[46px]">
        <div className="eyebrow text-sage mb-3.5">Find your place</div>
        <h2 className="text-[32px] max-w-[520px]">
          Ways to belong, beyond Sunday.
        </h2>
      </div>
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[26px]">
        {cards.map(({ title, description, href, cta, band, Illustration }) => (
          <div
            key={title}
            className="bg-paper border border-ink/10 rounded-md overflow-hidden"
          >
            <div className="h-[150px]" style={{ background: band }}>
              <Illustration />
            </div>
            <div className="p-6 pb-7">
              <h3 className="text-[17px] font-semibold font-sans mb-2.5">
                {title}
              </h3>
              <p className="text-sm text-ink-soft mb-4">{description}</p>
              <Link
                href={href}
                className="text-[13px] font-semibold text-ink border-b border-gold pb-0.5"
              >
                {cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
