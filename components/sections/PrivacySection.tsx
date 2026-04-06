'use client'

import { motion } from 'framer-motion'
import { Lock, Eye, Shield } from 'lucide-react'
import SectionTracker from '@/components/SectionTracker'

const privacyPoints = [
  {
    icon: Lock,
    title: 'No tracking outside active sessions',
    description: 'Your location data is only shared when you start a safety session',
  },
  {
    icon: Eye,
    title: "You're always in control of visibility",
    description: 'Easily manage who can see your information and when',
  },
  {
    icon: Shield,
    title: 'No hidden monitoring or background tracking',
    description: "Complete transparency about what data is collected and how it's used",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function PrivacySection() {
  return (
    <section id="privacy" className="py-20 md:py-32 px-4 bg-background">
      <SectionTracker name="privacy" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built with privacy first
          </h2>
          <p className="text-lg text-foreground/60">
            Safety and trust go hand in hand
          </p>
        </motion.div>

        {/* Privacy Points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {privacyPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-card rounded-2xl p-8 h-full border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-primary/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
