'use client'

/**
 * SectionTracker — invisible component that fires a GA4 `section_view` event
 * exactly once when its parent section enters the viewport.
 *
 * Usage:
 *   <section id="features">
 *     <SectionTracker name="features" />
 *     ...content...
 *   </section>
 */

import { useEffect, useRef } from 'react'
import { trackSectionView } from '@/lib/analytics'

interface SectionTrackerProps {
  /** Human-readable section name sent as the GA event label */
  name: string
  /** Fraction of element visible before firing (default 0.2 = 20%) */
  threshold?: number
}

export default function SectionTracker({ name, threshold = 0.2 }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(name)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [name, threshold])

  // Renders nothing — purely for side effects
  return <div ref={ref} aria-hidden="true" className="sr-only" />
}
