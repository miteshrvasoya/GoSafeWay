'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface DemoState {
  id: string
  label: string
  status: string
  color: string
  emoji: string
}

interface DemoCardProps {
  state: DemoState
}

const getStatusIcon = (id: string) => {
  switch (id) {
    case 'normal':
      return <CheckCircle2 className="w-8 h-8" />
    case 'checking':
      return <Clock className="w-8 h-8" />
    case 'alert':
      return <AlertCircle className="w-8 h-8" />
    default:
      return <CheckCircle2 className="w-8 h-8" />
  }
}

const getStatusColor = (id: string) => {
  switch (id) {
    case 'normal':
      return 'text-green-500'
    case 'checking':
      return 'text-yellow-500'
    case 'alert':
      return 'text-red-500'
    default:
      return 'text-green-500'
  }
}

export default function DemoCard({ state }: DemoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Outer Container - Phone Frame */}
      <div className="max-w-md mx-auto relative">
        {/* Phone Body */}
        <div className="relative bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-3xl p-3 aspect-[9/16] shadow-2xl border border-foreground/10 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl z-10" />

          {/* Screen Content */}
          <div className={`w-full h-full bg-gradient-to-br ${state.color} rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 relative`}>
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Large Emoji */}
              <motion.div
                animate={{
                  scale: state.id === 'checking' ? [1, 1.1, 1] : 1,
                  rotate: state.id === 'alert' ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: state.id === 'checking' ? 1.5 : 0.6,
                  repeat: Infinity,
                }}
                className="text-6xl"
              >
                {state.emoji}
              </motion.div>

              {/* Status Text */}
              <div className="space-y-2">
                <p className="text-white text-xl font-bold text-shadow">
                  {state.status}
                </p>
              </div>

              {/* Status Badge */}
              <div className={`inline-block px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur`}>
                <div className={`flex items-center gap-2 ${getStatusColor(state.id)}`}>
                  {getStatusIcon(state.id)}
                  <span className="text-white font-semibold text-sm">{state.label}</span>
                </div>
              </div>

              {/* Details */}
              <div className="pt-4 space-y-1 text-white/80 text-sm">
                <p>Session: John</p>
                <p>Destination: Downtown Station</p>
                {state.id === 'checking' && <p>Verifying last known location...</p>}
                {state.id === 'alert' && <p>Last verified 5 minutes ago</p>}
                {state.id === 'normal' && <p>ETA: 3 minutes</p>}
              </div>
            </div>

            {/* Loading Indicator for Checking State */}
            {state.id === 'checking' && (
              <motion.div
                className="absolute bottom-8 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${state.color} blur-3xl opacity-30 -z-10`} />
      </div>
    </motion.div>
  )
}
