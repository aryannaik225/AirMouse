'use client'

import React, { useState } from 'react'

const faqs = [
  {
    q: 'Does AirMouse support Mac or Linux?',
    a: 'Currently only Windows 10/11 is supported.'
  },
  {
    q: 'Can I use two hands at once?',
    a: 'Yes—dual-hand mode is supported for advanced gestures.'
  },
  {
    q: 'How much CPU does it use?',
    a: '~5–10% on a modern dual-core CPU.'
  },
  {
    q: 'Does it work in low light?',
    a: 'Better in well-lit environments, but low-light still functions.'
  },
  {
    q: 'How do I report bugs or request features?',
    a: 'Open an issue on GitHub or use the feedback form below.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="py-16 px-6 sm:px-16 bg-white border-t border-black/10">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h3 className="text-3xl inter-bold mb-2">Frequently Asked Questions</h3>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border border-black/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-4 py-3 inter-medium flex justify-between items-center bg-white/60 backdrop-blur-xl"
            >
              <span>{f.q}</span>
              <span className="text-2xl">{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 bg-white">
                <p className="text-black/70">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
