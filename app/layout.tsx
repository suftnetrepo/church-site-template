import type { Metadata } from 'next';
import { Fraunces, Playfair_Display, Merriweather, Inter, Public_Sans, Work_Sans, IBM_Plex_Mono, JetBrains_Mono, Space_Mono } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SwrProvider } from '@/components/providers/swr-provider';
import { getChurchSettings, getRegularServices } from '@/lib/server-data';
import { churchConfig } from '@/church.config';

/**
 * next/font/google requires each font to be a static, named import — you
 * can't dynamically pick "whichever Google Font a church wants" at
 * runtime. So instead of one font per slot, each slot has a short,
 * pre-approved list (avoids an open-ended licensing/support question every
 * time a new church wants "any font"), and church.config.ts's string value
 * selects among them. Adding a new option to the list is one import + one
 * switch case — it doesn't touch any other file.
 */
const displayFonts = {
  Fraunces: Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600'] }),
  'Playfair Display': Playfair_Display({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600'] }),
  Merriweather: Merriweather({ subsets: ['latin'], variable: '--font-display', weight: ['400', '700'] })
};

const sansFonts = {
  Inter: Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] }),
  'Public Sans': Public_Sans({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] }),
  'Work Sans': Work_Sans({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] })
};

const monoFonts = {
  'IBM Plex Mono': IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['500'] }),
  'JetBrains Mono': JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['500'] }),
  'Space Mono': Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] })
};

const displayFont = displayFonts[churchConfig.theme.fontDisplay as keyof typeof displayFonts] ?? displayFonts.Fraunces;
const sansFont = sansFonts[churchConfig.theme.fontSans as keyof typeof sansFonts] ?? sansFonts.Inter;
const monoFont = monoFonts[churchConfig.theme.fontMono as keyof typeof monoFonts] ?? monoFonts['IBM Plex Mono'];

export const metadata: Metadata = {
  title: {
    default: churchConfig.name,
    template: `%s — ${churchConfig.name}`
  },
  description: churchConfig.tagline
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Seeds a site-wide SWR fallback so the Footer (and anything else outside a
  // page's own SwrProvider) can use useSettings()/useRegularServices() too,
  // without every layout-level component re-fetching on its own.
  const [settings, services] = await Promise.all([getChurchSettings(), getRegularServices()]);
  const fallback: Record<string, unknown> = {};
  if (settings) fallback['/api/settings'] = settings;
  if (services) fallback['/api/regular-services'] = services;

  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <body>
        <SwrProvider fallback={fallback}>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </SwrProvider>
      </body>
    </html>
  );
}
