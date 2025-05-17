'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaHandPaper, FaMousePointer, FaRocket, FaCogs } from 'react-icons/fa'

const steps = [
  {
    icon: <FaHandPaper className="text-[#4784F1] text-3xl" />,
    title: 'Enable Webcam',
    description: 'AirMouse uses your webcam to track hand gestures in real-time.'
  },
  {
    icon: <FaCogs className="text-[#43C6AC] text-3xl" />,
    title: 'Recognize Gestures',
    description: 'Our AI model detects and maps your gestures to system actions.'
  },
  {
    icon: <FaMousePointer className="text-[#F7B733] text-3xl" />,
    title: 'Control with Hands',
    description: 'Perform clicks, scrolls, and navigation without touching your mouse.'
  },
  {
    icon: <FaRocket className="text-[#A76DFF] text-3xl" />,
    title: 'Boost Productivity',
    description: 'Seamless and intuitive — perfect for presentations, work, or fun.'
  }
]

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } },
}

const HowItWorks = () => {
  return (
    <section className="relative py-24 px-6 sm:px-20 overflow-hidden">
      
      {/* Custom background pattern (as provided) */}
      <div className="absolute inset-0 z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-10 -z-10 m-auto h-[210px] w-[210px] rounded-full bg-fuchsia-400 opacity-30 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-black text-4xl sm:text-5xl inter-bold mb-14"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-black text-xl inter-semibold mb-2">{step.title}</h3>
              <p className="text-black/70 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
