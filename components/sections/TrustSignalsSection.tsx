'use client'

import { motion } from 'framer-motion'
import { Heart, Lock, Eye } from 'lucide-react'

const signals = [
  {
    icon: Heart,
    label: 'Built for families',
    description: 'Designed with love for what matters most',
  },
  {
    icon: Lock,
    label: 'Privacy-first design',
    description: 'Your data stays yours, always',
  },
  {
    icon: Eye,
    label: 'No always-on tracking',
    description: 'Session-based safety, not surveillance',
  },
]

export default function TrustSignalsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {signals.map((signal) => {
            const Icon = signal.icon
            return (
              <motion.div
                key={signal.label}
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">{signal.label}</p>
                  <p className="text-xs text-foreground/60">{signal.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
