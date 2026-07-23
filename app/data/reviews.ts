import type { Review } from '~/types/catalog'

/**
 * Customer reviews / testimonials.
 *
 * EVIDENCE RULE — this array is intentionally EMPTY. MYOTTO's aggregate rating
 * is verified (4.7★ from 111 Google reviews, shown in the Reviews section and in
 * LocalBusiness JSON-LD), but we do NOT have the individual review text/authors
 * from a verifiable source, so we do not invent any. When real quotes are
 * available (copied from the Google Business Profile with the reviewer's name &
 * date, or explicit permission), add them here and the Reviews section will
 * render them as cards automatically. Example shape:
 *
 *   {
 *     author: 'Budi S.',
 *     rating: 5,
 *     text: 'Servis rapih, hasil bore up mantap. Recommended!',
 *     date: 'Jun 2026',
 *     source: 'google',
 *   },
 */
export const reviews: Review[] = []
