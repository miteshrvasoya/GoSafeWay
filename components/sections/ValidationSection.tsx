'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'

type ValidationState = null | 'interested' | 'not-useful' | 'feedback'

export default function ValidationSection() {
  const [selectedOption, setSelectedOption] = useState<ValidationState>(null)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput.trim()) {
      // Store responses in local state (as per requirements)
      const response = {
        type: selectedOption,
        feedback: userInput,
        timestamp: new Date().toISOString(),
      }
      console.log('Validation response:', response)
      setSubmitted(true)
      setTimeout(() => {
        setSelectedOption(null)
        setUserInput('')
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Would you use GoSafeway?
          </h2>
          <p className="text-lg text-foreground/60">
            Help us understand your needs and shape the future of family safety
          </p>
        </motion.div>

        {/* Validation Options */}
        {!selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setSelectedOption('interested')}
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold px-8"
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                I&apos;m interested
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setSelectedOption('not-useful')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full font-semibold px-8 border-border hover:bg-muted"
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Not useful
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setSelectedOption('feedback')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full font-semibold px-8 border-border hover:bg-muted"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Give feedback
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Input Forms */}
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-foreground font-semibold mb-3">
                {selectedOption === 'interested'
                  ? 'What would you use GoSafeway for?'
                  : selectedOption === 'not-useful'
                  ? "What's missing or not useful?"
                  : 'Share your feedback'}
              </label>

              {selectedOption === 'feedback' ? (
                <Textarea
                  placeholder="Your feedback here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="rounded-xl border-border min-h-[120px]"
                />
              ) : (
                <Input
                  type="text"
                  placeholder={
                    selectedOption === 'interested'
                      ? 'e.g., Monitoring my kids on their way to school'
                      : 'e.g., Needs more detailed analytics'
                  }
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="rounded-xl border-border"
                />
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!userInput.trim() || submitted}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
                >
                  {submitted ? 'Thanks!' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedOption(null)
                    setUserInput('')
                  }}
                  variant="outline"
                  className="rounded-full border-border hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center"
                >
                  <p className="text-sm font-semibold text-primary">
                    Thanks for sharing your thoughts 🙌
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </section>
  )
}
