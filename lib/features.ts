import { notFound } from 'next/navigation';
import { churchConfig, type ChurchFeature } from '@/church.config';

export function hasFeature(feature: ChurchFeature): boolean {
  return churchConfig.features[feature] === true;
}

/**
 * Call at the top of any page that only exists for churches with that
 * feature enabled (WOFBI, BFC, Free Transport, Food Bank). This is the
 * actual enforcement — hiding the nav link alone isn't a guard, since the
 * route would still render for anyone who has the URL. A church that
 * doesn't have this feature gets a real 404, not a page with nothing to
 * show or a broken-looking stub.
 */
export function requireFeature(feature: ChurchFeature) {
  if (!hasFeature(feature)) {
    notFound();
  }
}
