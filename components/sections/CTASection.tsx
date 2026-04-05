'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Store email signup in local state
      const signup = {
        email,
        timestamp: new Date().toISOString(),
      }
      console.log('Email signup:', signup)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section id="cta" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background to-muted/40">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Be among the first to try GoSafeway
          </motion.h2>

          <motion.p
            className="text-base text-foreground/60 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Because sometimes, a simple confirmation means everything.
          </motion.p>

          {/* Email Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitted}
              className="rounded-full border-border flex-1"
              required
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={submitted}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8 whitespace-nowrap"
              >
                {submitted ? 'Welcome!' : 'Join Early Access'}
                {!submitted && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </motion.div>
          </motion.form>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-primary/10 border border-primary/30 rounded-xl"
            >
              <p className="text-sm font-semibold text-primary">
                Thanks for signing up! Check your inbox for early access details.
              </p>
            </motion.div>
          )}

          {/* Microcopy */}
          <motion.p
            className="text-sm text-foreground/50 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            No spam. Early access only.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
