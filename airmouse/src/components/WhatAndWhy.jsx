'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Highlight } from './ui/hero-highlight'
import { FaHandPaper, FaChalkboardTeacher, FaMousePointer, FaBolt, FaGamepad, FaScroll } from 'react-icons/fa'
import Marquee from 'react-marquee-slider'
import Image from 'next/image'

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
  { image: '/Star.svg' },
  { text: 'Creative Workflow' },
  { image: '/Star.svg' },
  { text: 'Gaming Sessions' },
  { image: '/Star.svg' },
  { text: 'Casual Browsing' },
  { image: '/Star.svg' },
  { text: 'Media & Entertainment' },
  { image: '/Star.svg' },
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
    <div className="relative z-10 px-6 pb-28 w-screen bg-white/60 backdrop-blur-xl border-t border-white/20 shadow-xl overflow-x-hidden">
      
      {/* Marquee */}
      <div className='mt-0 flex items-center w-full py-10 border-y border-white/20 bg-black pointer-events-none'>
        <Marquee
          className="w-full"
          velocity={25}
          scatterRandomly={false}
          resetAfterTries={200}
          items={items}
          pauseOnHover={false}
          direction='ltr'
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="mx-6 flex items-center justify-center text-center text-white text-lg font-bold"
            >
              {item.text && (
                <span className='text-white text-xl md:text-2xl poppins-semibold whitespace-nowrap bg-black px-4 py-2 rounded-xl border border-black/20 shadow-md'>
                  {item.text}
                </span>
              )}

              {item.image && (
                <Image
                  src={item.image}
                  alt="Star"
                  width={50}
                  height={50}
                  className="mx-3 w-12 h-12 object-contain"
                />
              )}
            </div>
          ))}
        </Marquee>
      </div>

      {/* What is AirMouse */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        custom={1}
      >
        <h2 className="text-4xl font-extrabold mb-4 inter-extrabold">
          Meet <Highlight className="text-black">AirMouse</Highlight>
        </h2>
        <p className="text-lg text-gray-700 inter-medium">
          A gesture-powered virtual mouse that uses just your webcam to control your computer.
          No hardware. No sensors. Just the magic of your hands.
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
        <h2 className="text-4xl font-extrabold mb-4 inter-extrabold">
          Why You’ll Love <Highlight className="text-black">AirMouse</Highlight>
        </h2>
        <p className="text-lg text-gray-700 inter-medium mb-12">
          Designed for developers, designers, gamers, presenters — or just casual users.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.3}
          >
            <div className="mb-4 text-[#3868ed]">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 inter-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-700 inter-medium">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WhatAndWhy
