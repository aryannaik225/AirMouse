'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const ContactCTA = () => {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
        setLoading(false)
        setError(null)
        setForm({ name: '', email: '', msg: '' })

        setTimeout(() => setSubmitted(false), 5000) // Reset after 5s
      } else {
        alert('Failed to send. Try again later.')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong!')
    }
  }

  return (
    <section className="pt-32 pb-20 px-6 sm:px-16 w-screen overflow-x-hidden bg-white cursor-default-custom">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h3 className="text-3xl inter-bold mb-2 cursor-select-custom">Have Feedback or Questions?</h3>
        <p className="text-black/70 inter-medium cursor-select-custom">We’d love to hear from you.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="col-span-1 sm:col-span-1 px-4 py-3 border border-black/10 rounded-lg cursor-select-custom"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="col-span-1 sm:col-span-1 px-4 py-3 border border-black/10 rounded-lg cursor-select-custom"
        />
        <textarea
          placeholder="Your Message"
          required
          rows={4}
          value={form.msg}
          onChange={(e) => setForm({ ...form, msg: e.target.value })}
          className="col-span-1 sm:col-span-2 px-4 py-3 border border-black/10 rounded-lg cursor-select-custom"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className={`col-span-1 sm:col-span-2 px-6 py-3 rounded-full shadow-lg transform transition inter-medium flex items-center justify-center gap-2
            ${submitted
              ? 'bg-green-500 text-white cursor-default-custom'
              : 'bg-gradient-to-r from-[#3868ed] to-[#620bcc] text-white hover:scale-105 cursor-pointer-custom'}
          `}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <FaCheck className="text-white" />
                Sent!
              </motion.div>
            ) : (
              <motion.div
                key="notSubmitted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                Send Feedback
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </section>
  )
}

export default ContactCTA
