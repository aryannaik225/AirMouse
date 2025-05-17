'use client'

import React, { useState } from 'react'

const ContactCTA = () => {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  return (
    <section className="py-20 px-6 sm:px-16 bg-white border-t border-black/10">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h3 className="text-3xl inter-bold mb-2">Have Feedback or Questions?</h3>
        <p className="text-black/70 inter-medium">We’d love to hear from you.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = `mailto:aryannaik225@gmail.com?subject=AirMouse%20Feedback&body=${encodeURIComponent(
            form.msg + '\n\n— ' + form.name + ' (' + form.email + ')'
          )}`
        }}
        className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="col-span-1 sm:col-span-1 px-4 py-3 border border-black/10 rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="col-span-1 sm:col-span-1 px-4 py-3 border border-black/10 rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          required
          rows={4}
          value={form.msg}
          onChange={(e) => setForm({ ...form, msg: e.target.value })}
          className="col-span-1 sm:col-span-2 px-4 py-3 border border-black/10 rounded-lg"
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 px-6 py-3 bg-gradient-to-r from-[#3868ed] to-[#620bcc] text-white rounded-full shadow-lg hover:scale-105 transform transition inter-medium"
        >
          Send Feedback & Download
        </button>
      </form>
    </section>
)
}

export default ContactCTA;
