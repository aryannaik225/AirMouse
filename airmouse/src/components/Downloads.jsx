'use client'

import { motion } from 'framer-motion'
import { FaDownload, FaCheckCircle } from 'react-icons/fa'
import React from 'react'

const DownloadAndRequirements = () => {
  const requirements = [
    "OS: Windows 10 or higher (64-bit)",
    "RAM: 4 GB or more",
    "Webcam: 720p or better",
    "Storage: 300 MB free space",
    "Permissions: Camera access + cursor control",
  ]

  return (
    <section className="relative py-20 px-6 sm:px-16 overflow-hidden border-t border-black/10 bg-white">
      {/* Background Grid + Glow */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
        bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full 
          bg-fuchsia-400 opacity-20 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl inter-bold mb-4">Download AirMouse</h2>
        <p className="text-black/70 inter-medium text-lg mb-3">
          Choose the version that matches your dominant hand for optimal cursor alignment and comfort.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12"
      >
        {/* Download Section */}
        <div className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl inter-bold mb-6 text-left">Download Options</h3>
          <div className="flex flex-col space-y-4">
            <a
              href="https://www.dropbox.com/scl/fi/tgwfjwguykxmogoxsjx16/AirMouse-Right-Hand.zip?rlkey=hidx5xabudwqfv8tdm6rb0wys&st=e8r1ug1g&dl=0"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3868ed] to-[#620bcc] text-white rounded-full shadow-lg hover:scale-105 transform transition"
            >
              <FaDownload />
              Right-Handed Setup
            </a>
            <a
              href="https://www.dropbox.com/scl/fi/qmhs61ymgsg0307voo7rc/AirMouse-Left-Hand.zip?rlkey=dgux7j0xsrpxevoutu8ra1hge&st=pevned3k&dl=0"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#ed3868] to-[#cc0b62] text-white rounded-full shadow-lg hover:scale-105 transform transition"
            >
              <FaDownload />
              Left-Handed Setup
            </a>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl inter-bold mb-6 text-left">System Requirements</h3>
          <ul className="space-y-4">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="text-black inter-medium">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

export default DownloadAndRequirements
