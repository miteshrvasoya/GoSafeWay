'use client'

import { motion } from 'framer-motion'
import { MapPin, CheckCircle2, Clock, Shield } from 'lucide-react'

// Pulsing "live" dot
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
    </span>
  )
}

// Checkpoint row
function CheckpointRow({
  label,
  time,
  done,
  delay,
}: {
  label: string
  time: string
  done: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center gap-2.5"
    >
      {/* Dot indicator */}
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          done
            ? 'border-green-500 bg-green-500'
            : 'border-muted-foreground/30 bg-background'
        }`}
      >
        {done && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[11px] font-medium leading-tight ${
            done ? 'text-foreground/40 line-through decoration-foreground/30' : 'text-foreground/80'
          }`}
        >
          {label}
        </p>
      </div>

      <span className="shrink-0 text-[10px] tabular-nums text-foreground/35">{time}</span>
    </motion.div>
  )
}

export default function PhoneFrame() {
  return (
    <div className="relative w-full max-w-[260px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[44px] bg-gradient-to-br from-primary/25 to-accent/25 blur-2xl opacity-70 -z-10 scale-90" />

      {/* ── Phone shell ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-[42px] overflow-hidden border-[6px] border-foreground/10 dark:border-white/10 bg-background shadow-2xl"
        style={{ aspectRatio: '9/19.5' }}
      >
        {/* Dynamic island / notch */}
        <div className="absolute top-0 inset-x-0 z-30 flex justify-center pt-2.5">
          <div className="h-5 w-24 rounded-full bg-foreground/80 dark:bg-foreground/70" />
        </div>

        {/* Screen */}
        <div className="flex h-full flex-col bg-[#f4f5f7] dark:bg-slate-900">

          {/* ── Status bar ── */}
          <div className="flex items-center justify-between px-5 pt-8 pb-1 shrink-0">
            <span className="text-[9px] font-semibold text-foreground/50">9:41 AM</span>
            <div className="flex items-center gap-1">
              {/* Battery */}
              <svg width="20" height="10" viewBox="0 0 20 10" className="text-foreground/50">
                <rect x="0.5" y="0.5" width="17" height="9" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
                <rect x="1.5" y="1.5" width="11" height="7" rx="1.5" fill="currentColor" className="text-green-500"/>
                <rect x="18" y="3" width="2" height="4" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* ── App header ── */}
          <div className="shrink-0 bg-gradient-to-r from-[#1a56db] to-[#0891b2] px-4 pt-2 pb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-white/80" />
                <span className="text-[10px] font-bold tracking-wide text-white/90">GoSafeway</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                <PulseDot />
                <span className="text-[9px] font-semibold text-white/90">LIVE</span>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-white leading-tight">Safety Session</p>
              <p className="text-[10px] text-white/70 mt-0.5">Rahul → Downtown Station</p>
            </div>
          </div>

          {/* ── Map area ── */}
          <div className="relative flex-1 overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-0">
            {/* Road grid lines */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-25 dark:opacity-20"
            >
              {/* Horizontal roads */}
              <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#94a3b8" strokeWidth="10"/>
              <line x1="0" y1="72%" x2="100%" y2="72%" stroke="#94a3b8" strokeWidth="7"/>
              {/* Vertical roads */}
              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#94a3b8" strokeWidth="7"/>
              <line x1="72%" y1="0" x2="72%" y2="100%" stroke="#94a3b8" strokeWidth="10"/>
              {/* Block fill */}
              <rect x="0" y="0" width="30%" height="35%" fill="#e2e8f0" opacity="0.6"/>
              <rect x="33%" y="0" width="39%" height="35%" fill="#e2e8f0" opacity="0.6"/>
              <rect x="75%" y="0" width="25%" height="35%" fill="#e2e8f0" opacity="0.6"/>
              <rect x="0" y="38%" width="30%" height="34%" fill="#e2e8f0" opacity="0.6"/>
            </svg>

            {/* Animated route path */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 200 280"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 60 240 L 60 98 Q 60 72 86 72 L 144 72"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
              />
            </svg>

            {/* ETA chip – top centre */}
            <div className="absolute left-1/2 top-2.5 -translate-x-1/2 flex items-center gap-1 rounded-full bg-white/95 dark:bg-slate-900/95 border border-border/30 px-2.5 py-1 shadow-md backdrop-blur-sm">
              <Clock className="h-2.5 w-2.5 text-primary" />
              <span className="text-[10px] font-semibold text-foreground">ETA: ~8 min</span>
            </div>

            {/* Origin pin – bottom-left */}
            <div className="absolute bottom-[18%] left-[25%] flex flex-col items-center gap-1">
              <div className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-white dark:bg-slate-900 shadow-md" />
              <span className="rounded bg-white/90 dark:bg-slate-900/90 px-1 text-[8px] font-semibold text-foreground/60">
                Home
              </span>
            </div>

            {/* Destination pin – upper-right */}
            <div className="absolute top-[15%] right-[16%] flex flex-col items-center gap-0.5">
              <MapPin className="h-5 w-5 text-accent drop-shadow-md" fill="currentColor" />
              <span className="rounded bg-white/90 dark:bg-slate-900/90 px-1 text-[8px] font-semibold text-foreground/60 whitespace-nowrap">
                Downtown
              </span>
            </div>

            {/* Moving person dot */}
            <motion.div
              className="absolute"
              animate={{
                bottom: ['18%', '38%', '55%'],
                left: ['25%', '25%', '58%'],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <div className="h-5 w-5 rounded-full border-2 border-white bg-primary shadow-lg shadow-primary/40 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </motion.div>
          </div>

          {/* ── Checkpoint list ── */}
          <div className="shrink-0 border-t border-border/40 bg-background px-4 py-2.5">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-foreground/40">
              Checkpoints
            </p>
            <div className="flex flex-col gap-1.5">
              <CheckpointRow label="Left home" time="9:15 AM" done={true} delay={0.7} />
              <CheckpointRow label="Metro Station" time="9:28 AM" done={true} delay={0.85} />
              <CheckpointRow label="Downtown Station" time="~9:49 AM" done={false} delay={1.0} />
            </div>
          </div>

          {/* ── Status footer ── */}
          <div className="shrink-0 border-t border-green-100 dark:border-green-900/40 bg-green-50 dark:bg-green-950/20 px-4 py-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-green-700 dark:text-green-400">All looks good ✓</p>
                <p className="text-[10px] text-green-600/60 dark:text-green-500/50">On track · Last seen 1m ago</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </motion.div>
            </div>
          </div>

          {/* ── Home indicator bar ── */}
          <div className="shrink-0 flex justify-center bg-background pb-2 pt-1.5">
            <div className="h-1 w-20 rounded-full bg-foreground/10" />
          </div>

        </div>
      </motion.div>
    </div>
  )
}
