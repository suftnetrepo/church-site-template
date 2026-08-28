import Link from 'next/link';
import { Clock, Heart, HandHeart, Car } from 'lucide-react';

const items = [
  {
    icon: Clock,
    title: 'Service times',
    description: 'Sunday worship, midweek Bible study, and prayer meetings.',
    href: '/service-times',
    cta: 'See the schedule',
    iconBg: 'bg-gold-pale',
    iconColor: 'text-gold-deep'
  },
  {
    icon: Heart,
    title: 'Give',
    description: 'Support the ministry and our community outreach securely online.',
    href: '/give',
    cta: 'Give now',
    iconBg: 'bg-sage-soft',
    iconColor: 'text-sage'
  },
  {
    icon: HandHeart,
    title: 'Prayer times',
    description: "Join us in prayer throughout the week — see the full schedule.",
    href: '/prayers',
    cta: 'Prayer Times',
    iconBg: 'bg-indigo/10',
    iconColor: 'text-indigo'
  },
  {
    icon: Car,
    title: 'Free transport',
    description: "Book a taxi, bring the receipt, and we'll refund your fare.",
    href: '/free-transport',
    cta: 'Learn more',
    iconBg: 'bg-[#F3DFCF]',
    iconColor: 'text-[#9C5B3C]'
  }
];

export function QuickAccess() {
  return (
    <section className="bg-paper px-8 pb-[24px]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-ink/10 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 lg:-translate-y-[60px]">
        {items.map((item) => (
          <div key={item.title} className="bg-paper p-[30px_26px]">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-[38px] h-[38px] shrink-0 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center`}>
                <item.icon size={18} />
              </div>
              <h3 className="text-base font-semibold font-sans">{item.title}</h3>
            </div>
            <p className="text-[13.5px] text-ink-soft mb-3.5">{item.description}</p>
            <Link href={item.href} className="text-[13px] font-semibold text-gold-deep inline-flex items-center gap-1">
              {item.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
