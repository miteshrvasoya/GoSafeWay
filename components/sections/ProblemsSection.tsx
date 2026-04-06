'use client'

import { motion } from 'framer-motion'
import { RotateCw, Eye, AlertTriangle } from 'lucide-react'
import SectionTracker from '@/components/SectionTracker'

const problems = [
  {
    icon: RotateCw,
    title: 'You keep opening maps again and again',
    description: "Wondering if they've reached safely yet?",
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Eye,
    title: 'Most apps feel like constant surveillance',
    description: 'Tracking every step, every moment',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: AlertTriangle,
    title: 'False alerts create unnecessary panic',
    description: "Not knowing if it's really important",
    color: 'from-orange-500 to-orange-600',
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

export default function ProblemsSection() {
  return (
    <section className="relative py-20 md:py-32 px-4 bg-background overflow-hidden">
      <SectionTracker name="problems" />
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-destructive/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Staying safe shouldn&apos;t feel stressful
          </h2>
          <p className="text-lg text-foreground/60">
            The problems with traditional tracking apps
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="relative overflow-hidden backdrop-blur-md bg-card/60 dark:bg-card/30 rounded-2xl p-8 h-full transition-all duration-300 border border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {problem.description}
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
