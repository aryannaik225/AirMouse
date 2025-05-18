'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Highlight } from './ui/hero-highlight'
import { FaHandPaper, FaChalkboardTeacher, FaMousePointer, FaBolt, FaGamepad, FaScroll } from 'react-icons/fa'
import Image from 'next/image'
import Marquee from './ui/Marquee'

const features = [
  {
    icon: <FaHandPaper size={28} />,
    title: 'Hands-Free Control',
    description: 'Navigate, click, and scroll — all without touching your mouse.',
  },
  {
    icon: <FaBolt size={28} />,
    title: 'Gesture Simplicity',
    description: 'Simple hand gestures. No extra hardware or learning curve.',
  },
  {
    icon: <FaChalkboardTeacher size={28} />,
    title: 'Perfect for Presentations',
    description: 'Control your slides while speaking — no clickers required.',
  },
  {
    icon: <FaMousePointer size={28} />,
    title: 'Built for Focus',
    description: 'Stay immersed while coding, designing, or reading online.',
  },
  {
    icon: <FaGamepad size={28} />,
    title: 'Fun for Gamers',
    description: 'Integrate gesture control into your gaming experience.',
  },
  {
    icon: <FaScroll size={28} />,
    title: 'Touch-Free Browsing',
    description: 'Scroll social media or the web without lifting a finger.',
  },
]

const items = [
  { text: 'Presentation Control' },
  // { image: '/Star.svg' },
  { text: 'Creative Workflow' },
  // { image: '/Star.svg' },
  { text: 'Gaming Sessions' },
  // { image: '/Star.svg' },
  { text: 'Casual Browsing' },
  // { image: '/Star.svg' },
  { text: 'Media & Entertainment' },
  // { image: '/Star.svg' },
]

const WhatAndWhy = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    })
  }

  return (
    <div className="cursor-default-custom relative z-10 pb-28 w-screen bg-white/60 backdrop-blur-xl border-t border-white/20 shadow-xl overflow-x-hidden">

      <div className='mt-0 w-full select-none'>
        <Marquee />
      </div>

      {/* What is AirMouse */}
      <motion.div
        id='features'
        className="max-w-4xl mx-auto text-center mt-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        custom={1}
      >
        <h2 className="text-4xl font-extrabold mb-4 inter-extrabold cursor-select-custom">
          Meet <Highlight className="text-black">AirMouse</Highlight>
        </h2>
        <p className="text-lg text-gray-700 inter-medium cursor-select-custom">
          A gesture-powered virtual mouse that uses just your webcam to control your computer.
        </p>
      </motion.div>

      {/* Why AirMouse - Feature Cards */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        custom={2}
      >
        <p className="text-lg text-pink-400 inter-medium mb-12 cursor-select-custom">
          Designed for developers, designers, gamers, presenters — or just casual users.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="hover:scale-105 relative p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.3}
          >
            <div className='absolute w-2 h-12 bg-[#3868ed] rounded-l-xl top-2 -left-2'/>
            <div className="mb-4 text-[#3868ed] select-none" draggable={false}>{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 inter-semibold cursor-default-custom">{feature.title}</h3>
            <p className="text-sm text-gray-700 inter-medium cursor-default-custom">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WhatAndWhy
