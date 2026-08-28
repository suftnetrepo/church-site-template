/**
 * church.config.ts — the ONE file that turns this generic starter into a
 * specific church's site. This repo is a TEMPLATE: every value below is a
 * placeholder, on purpose. Spinning up a new church's site means cloning
 * this repo, editing this file with their real values, replacing the
 * placeholder copy called out in README.md, and pointing env vars at their
 * own Jerur key and Brevo credentials.
 *
 * Winners Chapel Peterborough does NOT run on this template — their site
 * is its own separate, already-live repo. This starter exists so the next
 * church that asks for a site doesn't start from a blank Next.js project.
 */

export type ChurchFeature = 'wofbi' | 'bfc' | 'freeTransport' | 'foodBank';

export type ChurchConfig = {
  name: string;
  shortName: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
  };
  // Path to a real congregation/worship photo in /public, e.g. '/hero.jpg'.
  // Leave null to show a plain brand-colour gradient instead (the default
  // until the church supplies a photo).
  heroPhoto: string | null;
  // Path to the church logo in /public, e.g. '/logo.png'.
  // Leave null to show the generic SVG mark placeholder.
  logoPath: string | null;
  theme: {
    ink: string;
    inkSoft: string;
    paper: string;
    paperAlt: string;
    indigo: string;
    indigoDeep: string;
    gold: string;
    goldDeep: string;
    goldPale: string;
    sage: string;
    sageSoft: string;
    // Google Fonts family names — kept to a short list of pre-approved,
    // reliably-licensed fonts rather than "any font a church wants," which
    // turns into a support burden and a licensing question every time.
    fontDisplay: string;
    fontSans: string;
    fontMono: string;
  };
  // Every church-specific PROGRAM (not core pages like Home/Events/Give)
  // is gated behind one of these. Nothing renders — not the nav link, not
  // the route itself — unless it's true. See lib/features.ts.
  //
  // These are Winners Chapel Peterborough's actual programs, kept here as
  // real examples of what a feature flag looks like in practice — but they
  // default to false. A new church doesn't inherit someone else's
  // ministry program by default; each one gets turned on deliberately,
  // once that church confirms they actually run it.
  features: Record<ChurchFeature, boolean>;
};

export const churchConfig: ChurchConfig = {
  name: 'Your Church Name',
  shortName: 'Your Church',
  tagline: 'A one-line description of your church, shown in the header and page titles.',
  address: {
    line1: 'Your venue name',
    line2: 'Town, Postcode'
  },
  heroPhoto: null,   // drop a real photo in /public and set e.g. '/hero.jpg'
  logoPath: null,    // drop a real logo in /public and set e.g. '/logo.png'
  theme: {
    // A neutral starting palette — swap every value for the new church's
    // actual brand colors before launch. Not meant to ship as-is.
    ink: '#211F1C',
    inkSoft: '#6B675E',
    paper: '#FCFBF7',
    paperAlt: '#F2ECDE',
    indigo: '#1B2340',
    indigoDeep: '#12172A',
    gold: '#D9A441',
    goldDeep: '#8C6420',
    goldPale: '#F4E3C1',
    sage: '#5E7052',
    sageSoft: '#E6EBDD',
    fontDisplay: 'Fraunces',
    fontSans: 'Inter',
    fontMono: 'IBM Plex Mono'
  },
  features: {
    wofbi: false,
    bfc: false,
    freeTransport: false,
    foodBank: false
  }
};

