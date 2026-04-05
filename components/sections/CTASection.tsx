'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || isSubmitting) return

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
      setEmail('')
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error('Submission error:', error)
      setErrorMsg(error.message || 'Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-50 dark:opacity-20" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center rounded-3xl backdrop-blur-xl bg-background/40 dark:bg-background/20 border border-border/50 shadow-2xl p-10 md:p-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Be among the first to try GoSafeway
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/70 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Because sometimes, a simple confirmation means everything. Sign up for early access to our smart safety engine.
          </motion.p>

          <div className="max-w-md mx-auto relative h-[60px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full absolute inset-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="rounded-full border-border/50 bg-background/50 backdrop-blur-sm flex-1 h-12 text-base focus-visible:ring-primary/50"
                    required
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto h-12">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold px-8 whitespace-nowrap shadow-lg shadow-primary/25"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join Early Access'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center p-4 bg-green-500/10 border border-green-500/20 rounded-full"
                >
                  <p className="flex items-center text-sm sm:text-base font-semibold text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    You're on the list! Keep an eye on your inbox.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 md:mt-16 text-center h-6">
            {errorMsg ? (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm text-destructive"
              >
                {errorMsg}
              </motion.p>
            ) : (
              <motion.p
                className="text-sm text-foreground/40 font-medium"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                No spam. Early access only.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
