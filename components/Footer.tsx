'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/40 border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-foreground/60 text-sm">
            GoSafeway — Safety without surveillance
          </p>
          <p className="text-foreground/40 text-xs flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary" /> for families who care
          </p>
          <p className="text-foreground/30 text-xs">
            © {currentYear} GoSafeway. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
