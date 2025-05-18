'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Does AirMouse support Mac or Linux?',
    a: 'Currently only Windows 10/11 is supported. Will work on Mac/Linux in the future.',
  },
  {
    q: "What if my webcam isn't detected?",
    a: 'Make sure your webcam is connected and not being used by another app. Restarting the app or your PC can also help.',
  },
  {
    q: 'What gestures are supported?',
    a: 'AirMouse supports cursor movement, left/right click, drag, drawing mode, scroll, and volume control using hand gestures. You can find a complete User Guide with the downloaded app.',
  },
  {
    q: "Can I switch between Left and Right hand modes?",
    a: "Depending on which version you choose, Dominant hand controls the cursor, while the other hand is used for scroll and volume gestures.",
  },
  {
    q: 'Can I use two hands at once?',
    a: 'Yes. You can move the cursor with your right hand while using scroll or volume gestures with your left.',
  },
  {
    q: 'Is it safe to run?',
    a: "Yes! AirMouse runs entirely offline, doesn't collect data, and requires only webcam and input control access.",
  },
  {
    q: 'Does it work in low light?',
    a: 'Better in well-lit environments, but low-light still functions.',
  },
  {
    q: 'How do I report bugs or request features?',
    a: 'Open an issue on GitHub or use the feedback form below.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id='faq' className="relative w-screen pt-6 pb-16 px-6 sm:px-16 bg-white cursor-default-custom">
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        )}
      />

      {/* Top Fade (white to transparent) */}
      {/* <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" /> */}

      {/* Bottom Fade (transparent to white) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h3 className="text-3xl inter-bold mb-2 cursor-select-custom">Frequently Asked Questions</h3>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border border-black/10 rounded-lg overflow-hidden cursor-default-custom"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="cursor-default-custom w-full text-left px-4 py-3 inter-medium flex justify-between items-center bg-white/60 backdrop-blur-xl"
              >
                <span className='cursor-select-custom'>{f.q}</span>
                <span className="text-2xl select-none cursor-pointer-custom" draggable={false}>{openIndex === i ? '−' : '+'}</span>
              </button>

              {/* Animated Answer */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-white">
                      <p className="text-black/70 cursor-select-custom">{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
