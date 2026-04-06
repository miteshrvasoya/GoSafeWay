'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PhoneFrame from '@/components/PhoneFrame'
import { ChevronRight, Sparkles } from 'lucide-react'
import { trackEarlyAccessClick, trackDemoClick } from '@/lib/analytics'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10 lg:px-16">

      {/* Background dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(#d1d5db_1px,transparent_1px)] dark:[background-image:radial-gradient(#374151_1px,transparent_1px)] [background-size:28px_28px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,black_40%,transparent_100%)]"
      />

      {/* Ambient colour blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] h-[55%] w-[50%] rounded-full bg-primary/20 blur-[110px] opacity-70" />
        <div className="absolute top-[30%] right-[-5%] h-[50%] w-[45%] rounded-full bg-accent/15 blur-[110px] opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">

          {/* Left: copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Announcement badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3.5 py-1.5 text-sm font-medium text-foreground/70 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Introducing Smart Safety Sessions
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-[4rem]"
            >
              Know they&apos;re safe{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">—</span>{' '}
              without constantly checking.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="max-w-lg text-base leading-relaxed text-foreground/60 md:text-lg"
            >
              GoSafeway keeps your family connected during important journeys — with smart
              checkpoints and intelligent alerts, not constant surveillance.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  id="hero-early-access-btn"
                  size="lg"
                  onClick={() => {
                    trackEarlyAccessClick('hero')
                    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="h-12 rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-shadow"
                >
                  Get Early Access
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  id="hero-demo-btn"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    trackDemoClick('hero')
                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="h-12 rounded-full bg-background/50 px-8 font-semibold border-border/60 backdrop-blur-sm hover:bg-muted/50"
                >
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Micro-copy */}
            <motion.p variants={itemVariants} className="text-sm text-foreground/40">
              No tracking outside sessions. Privacy-first by design.
            </motion.p>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex items-center justify-center"
          >
            <PhoneFrame />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
