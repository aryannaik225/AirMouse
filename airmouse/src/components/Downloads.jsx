'use client'

import React from 'react'

const Downloads = () => (
  <section className="relative py-20 px-6 sm:px-16 bg-white overflow-hidden border-t border-black/10">
    <div className="absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl inter-bold mb-4">Get AirMouse Today</h2>
      <p className="text-lg text-black/70 mb-8 inter-medium">
        Choose your platform and start controlling with gestures.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/downloads/AirMouse-setup.exe"
          className="px-6 py-3 bg-gradient-to-r from-[#3868ed] to-[#620bcc] text-white rounded-full shadow-lg hover:scale-105 transform transition"
        >
          Windows Installer
        </a>
        <a
          href="https://github.com/aryannaik225/AirMouse/archive/refs/heads/main.zip"
          target="_blank"
          className="px-6 py-3 border-2 border-black/20 text-black rounded-full shadow-lg hover:bg-black/5 transition"
        >
          Python Source
        </a>
        <a
          href="/manuals/User-Manual.pdf"
          target="_blank"
          className="px-6 py-3 border-2 border-black/20 text-black rounded-full shadow-lg hover:bg-black/5 transition"
        >
          User Manual (PDF)
        </a>
      </div>
    </div>
  </section>
)

export default Downloads
