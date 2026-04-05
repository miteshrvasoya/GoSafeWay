'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Zap } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Safety Sessions',
    description: 'Only active when you need it. Start a session and GoSafeway quietly monitors progress.',
  },
  {
    icon: MapPin,
    title: 'Smart Checkpoints',
    description: 'Know when something\'s not right — instantly. Time and location work together to understand real progress.',
  },
  {
    icon: Zap,
    title: 'Intelligent Alerts',
    description: 'Verify before you panic. GoSafeway checks the situation first, then only alerts when necessary.',
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

export default function SolutionSection() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 bg-muted/30">
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
            GoSafeway makes safety simple and smart
          </h2>
          <p className="text-lg text-foreground/60">
            Three core features designed for peace of mind
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card rounded-2xl p-8 h-full border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
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
