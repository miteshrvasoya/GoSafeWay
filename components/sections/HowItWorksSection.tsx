'use client'

import { motion } from 'framer-motion'
import { Play, Activity, AlertCircle, Bell } from 'lucide-react'
import SectionTracker from '@/components/SectionTracker'

const steps = [
  {
    number: 1,
    title: 'Start a safety session',
    description: 'Select a contact and destination',
    icon: Play,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: 2,
    title: 'GoSafeway monitors quietly',
    description: 'Smart tracking without surveillance',
    icon: Activity,
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: 3,
    title: 'If something seems off, we verify first',
    description: 'Double-check before any alerts',
    icon: AlertCircle,
    color: 'from-orange-500 to-amber-500',
  },
  {
    number: 4,
    title: 'Only then, alerts are sent',
    description: 'You stay informed, not alarmed',
    icon: Bell,
    color: 'from-purple-500 to-pink-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 px-4 bg-background">
      <SectionTracker name="how_it_works" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-foreground/60">
            A simple, 4-step process for peace of mind
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-8 items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-sm font-bold text-foreground/50">Step {step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
