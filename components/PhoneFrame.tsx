'use client'

import { motion } from 'framer-motion'
import { MapPin, CheckCircle2 } from 'lucide-react'

export default function PhoneFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-sm"
    >
      {/* Phone Body */}
      <div className="relative bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-3xl p-3 aspect-[9/19] shadow-2xl border border-foreground/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl z-10" />

        {/* Screen Content */}
        <div className="w-full h-full bg-gradient-to-b from-primary/10 to-background rounded-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
            <h3 className="text-lg font-bold mb-1">Safety Session</h3>
            <p className="text-sm opacity-90">John to Downtown Station</p>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
            {/* Animated Dot */}
            <motion.div
              animate={{
                x: [10, 60, 10],
                y: [20, 80, 20],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-3 h-3 bg-primary rounded-full"
            />

            {/* Route Line */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 150"
              preserveAspectRatio="none"
            >
              <motion.polyline
                points="10,20 60,80 10,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>

            {/* Start & End Markers */}
            <div className="absolute top-6 left-4 w-4 h-4 rounded-full border-2 border-primary" />
            <div className="absolute bottom-8 right-4 w-4 h-4 rounded-full bg-accent" />
          </div>

          {/* Status Footer */}
          <div className="bg-white p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">All looks good</p>
                <p className="text-xs text-foreground/60">ETA: 2 mins</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl -z-10" />
    </motion.div>
  )
}
