'use client'

import { motion } from 'framer-motion'
import EnhancedDemoCard from '@/components/EnhancedDemoCard'

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 md:py-32 px-4 bg-muted/30">
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
            See GoSafeway in action
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Experience how GoSafeway intelligently handles different scenarios. Switch between states to see the app respond in real-time.
          </p>
        </motion.div>

        {/* Enhanced Demo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <EnhancedDemoCard />
        </motion.div>
      </div>
    </section>
  )
}
