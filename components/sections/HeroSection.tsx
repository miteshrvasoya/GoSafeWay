'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PhoneFrame from '@/components/PhoneFrame'
import { ChevronRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20 md:py-32 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GoSafeway
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Know they&apos;re safe — without constantly checking.
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-foreground/70 leading-relaxed max-w-md">
              GoSafeway helps you stay connected with your loved ones during important moments—without stress, repeated checking, or intrusive tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('cta')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8"
                >
                  Get Early Access
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('demo')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  variant="outline"
                  className="w-full rounded-full font-semibold px-8 border-border hover:bg-muted"
                >
                  Try Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:flex justify-center"
          >
            <PhoneFrame />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
