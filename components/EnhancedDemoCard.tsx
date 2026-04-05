'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react'

type DemoState = 'normal' | 'verifying' | 'alert'

const demoStates = {
  normal: {
    title: 'Everything looks good',
    description: 'Active session in progress',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    dotColor: 'bg-emerald-500',
  },
  verifying: {
    title: 'Checkpoint missed',
    description: 'Verifying status...',
    icon: Loader,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    dotColor: 'bg-blue-400',
  },
  alert: {
    title: 'Unable to confirm',
    description: 'Notifying contact...',
    icon: AlertCircle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    dotColor: 'bg-amber-500',
  },
}

export default function EnhancedDemoCard() {
  const [activeState, setActiveState] = useState<DemoState>('normal')
  const state = demoStates[activeState]
  const Icon = state.icon

  return (
    <div className="w-full max-w-md mx-auto">
      {/* State Buttons */}
      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {(Object.keys(demoStates) as DemoState[]).map((key) => (
          <motion.button
            key={key}
            onClick={() => setActiveState(key)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeState === key
                ? 'bg-primary text-white shadow-lg'
                : 'bg-muted text-foreground/70 hover:bg-muted/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {key === 'normal' ? '✓ Normal' : key === 'verifying' ? '⏳ Verifying' : '⚠️ Alert'}
          </motion.button>
        ))}
      </div>

      {/* Phone Frame */}
      <motion.div
        className="relative mx-auto w-full max-w-sm"
        layout
      >
        {/* iPhone Frame */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-900 dark:border-slate-700">
          {/* Phone Status Bar */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white px-6 py-3 flex justify-between items-center text-xs font-semibold">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 border border-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white rounded-sm"></div>
            </div>
          </div>

          {/* App Content */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4 min-h-96">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active Safety Session</h3>
              <p className="text-lg font-bold text-foreground mt-1">Sarah to Home</p>
            </div>

            {/* Map Area */}
            <div className="relative bg-white dark:bg-slate-700 rounded-2xl h-48 mb-4 overflow-hidden shadow-md border border-slate-200 dark:border-slate-600">
              {/* Map Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950"></div>

              {/* Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#gradient)" strokeWidth="3" opacity="0.5" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Animated Moving Dot */}
              <motion.div
                className={`absolute w-4 h-4 rounded-full shadow-lg border-2 border-white ${state.dotColor}`}
                initial={{ left: '20%', top: '30%' }}
                animate={{ left: '80%', top: '70%' }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                style={{
                  boxShadow: `0 0 12px ${activeState === 'normal' ? '#10b981' : activeState === 'verifying' ? '#3b82f6' : '#f59e0b'}`,
                }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${state.dotColor}`}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Destination Marker */}
              <div className="absolute right-6 bottom-6 w-6 h-6 rounded-full bg-primary border-2 border-white shadow-lg" />
            </div>

            {/* Status Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`${state.bgColor} rounded-xl p-4 border border-current border-opacity-20`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activeState === 'verifying' ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <Icon className={`w-5 h-5 ${state.color}`} />
                      </motion.div>
                    ) : (
                      <Icon className={`w-5 h-5 ${state.color}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${state.color}`}>{state.title}</p>
                    <p className="text-xs text-foreground/60 mt-1">{state.description}</p>
                  </div>
                </div>

                {/* Time Info */}
                <div className="mt-3 text-xs text-foreground/50 flex justify-between">
                  <span>Started 2:14 PM</span>
                  <span>3 mi away</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-foreground/60">
          Switch states to see how GoSafeway handles different scenarios
        </p>
      </motion.div>
    </div>
  )
}
