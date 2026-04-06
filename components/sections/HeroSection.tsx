'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PhoneFrame from '@/components/PhoneFrame'
import { ChevronRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 md:py-32 overflow-hidden">
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 mix-blend-multiply dark:mix-blend-screen [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] opacity-70 mix-blend-screen" />
        <div className="absolute top-[30%] right-[5%] w-[40%] h-[50%] rounded-full bg-accent/20 blur-[130px] opacity-50 mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.15 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border text-sm font-medium text-foreground/80 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Introducing Smart Safety Sessions</span>
            </motion.div>

            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GoSafeway
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]"
            >
              Know they&apos;re safe — without constantly checking.
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg"
            >
              GoSafeway helps you stay connected with your loved ones during important moments—without stress, repeated checking, or intrusive tracking.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8 h-12 shadow-xl shadow-primary/25"
                >
                  Get Early Access
                  <ChevronRight className="w-5 h-5 ml-2" />
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
                  className="w-full rounded-full font-semibold px-8 h-12 border-border hover:bg-muted/50 backdrop-blur-sm bg-background/50"
                >
                  Try Demo
                </Button>
              </motion.div>
            </motion.div>
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
