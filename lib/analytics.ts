/**
 * Google Analytics 4 event tracking utility for GoSafeway.
 * Usage: trackEvent({ action: 'cta_click', label: 'hero' })
 *
 * Measurement ID: G-N5X5LGHWDB
 */

export const GA_MEASUREMENT_ID = 'G-N5X5LGHWDB'

// ---------------------------------------------------------------------------
// Type declarations
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
  }
}

export type GaEventParams = {
  /** GA4 event name — snake_case */
  action: string
  /** Event category (maps to GA4 "category" param) */
  category?: string
  /** Descriptive label (maps to GA4 "label" param) */
  label?: string
  /** Numeric value e.g. position or count */
  value?: number
  /** Any extra custom parameters */
  [key: string]: string | number | boolean | undefined
}

// ---------------------------------------------------------------------------
// Core helper
// ---------------------------------------------------------------------------

/**
 * Fire a GA4 event. Safe to call server-side — it guards against `window`
 * being undefined (SSR / during build).
 */
export function trackEvent({ action, category, label, value, ...rest }: GaEventParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  })
}

// ---------------------------------------------------------------------------
// Pre-defined event helpers — keep callsites readable
// ---------------------------------------------------------------------------

/** Fired when any "Get Early Access" CTA is clicked */
export const trackEarlyAccessClick = (source: 'hero' | 'navbar' | 'cta_section') =>
  trackEvent({ action: 'early_access_click', category: 'cta', label: source })

/** Fired when "See How It Works" / "Try Demo" CTA is clicked */
export const trackDemoClick = (source: 'hero' | 'navbar') =>
  trackEvent({ action: 'demo_click', category: 'cta', label: source })

/** Fired when a user successfully joins the waitlist */
export const trackWaitlistSignup = (emailDomain?: string) =>
  trackEvent({
    action: 'waitlist_signup',
    category: 'conversion',
    label: emailDomain ?? 'unknown',
  })

/** Fired when a duplicate email attempts to join the waitlist */
export const trackWaitlistDuplicate = () =>
  trackEvent({ action: 'waitlist_duplicate', category: 'conversion' })

/** Fired when a section scroll into view (for engagement tracking) */
export const trackSectionView = (sectionName: string) =>
  trackEvent({ action: 'section_view', category: 'engagement', label: sectionName })

/** Fired when nav links are clicked */
export const trackNavClick = (target: string) =>
  trackEvent({ action: 'nav_click', category: 'navigation', label: target })
