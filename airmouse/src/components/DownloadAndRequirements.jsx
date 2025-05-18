'use client'

import { motion, useAnimation } from 'framer-motion'
import { FaDownload, FaCheckCircle } from 'react-icons/fa'
import { TbSparkles } from "react-icons/tb";
import { FaHandSparkles } from "react-icons/fa6";
import { IoHandLeftOutline } from "react-icons/io5";
import { RiEye2Line } from "react-icons/ri";
import React, { useRef } from 'react'
import ShinyButton from './ui/ShinyButton'
import { Button } from './ui/moving-border'
import { cn } from '@/lib/utils'

const DownloadAndRequirements = () => {
  const requirements = [
    "OS: Windows 10 or higher (64-bit)",
    "RAM: 4 GB or more",
    "Webcam: 720p or better",
    "Storage: 300 MB free space",
    "Permissions: Camera access + cursor control",
  ]

  const iconControlsRight = useAnimation()
  const iconControlsLeft = useAnimation()

  const flyingIcons = [
    { icon: <TbSparkles />, x: -80, y: -60 },
    { icon: <FaHandSparkles />, x: 60, y: -50 },
    { icon: <RiEye2Line />, x: -20, y: 40 },
  ];

  const flyingIconsLeft = [
    { icon: <TbSparkles />, x: -80, y: -60 },
    { icon: <IoHandLeftOutline />, x: 60, y: -50 },
    { icon: <RiEye2Line />, x: -20, y: 40 },
  ]

  return (
    <section className="relative py-32 px-6 sm:px-16 w-screen overflow-x-hidden overflow-hidden cursor-default-custom">
      {/* Patterned Grid Background + Glow */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        )}
      />

      {/* Top Fade (white to transparent) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      {/* Bottom Fade (transparent to white) */}
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" /> */}

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl inter-bold mb-4 cursor-select-custom">Download AirMouse</h2>
          <p className="text-black/60 inter-medium text-lg cursor-select-custom">
            Choose the version that matches your dominant hand for optimal cursor alignment and comfort.
          </p>
        </motion.div>

        {/* Main Content Boxes */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto justify-center items-stretch gap-6 mt-14"
        >
          {/* Download Options */}
          <div className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-2xl px-8 py-10 shadow-md w-full flex-col flex justify-between">
            <div>
              <h3 className="text-2xl inter-bold text-black mb-4 cursor-select-custom">Download Options</h3>
              <p className="text-black/70 inter-medium text-base mb-6 cursor-select-custom">
                Select the version based on your dominant hand:
              </p>
            </div>


            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                className="relative group/right-hand w-full sm:w-auto"
                onHoverStart={() => {
                  flyingIcons.forEach((item, idx) => {
                    iconControlsRight.start(i => i === idx ? {
                      opacity: 1,
                      x: item.x,
                      y: item.y,
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 100, damping: 8, delay: idx * 0.05 }
                    } : {});
                  });
                }}
                onHoverEnd={() => {
                  iconControlsRight.start(i => ({
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0.5,
                    transition: { duration: 0.3 }
                  }));
                }}
              >
                {/* Animated Icons */}
                {flyingIcons.map((item, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    animate={iconControlsRight}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    className={`absolute left-1/2 top-1/2 text-xl pointer-events-none z-0 
                      ${idx === 0 ? 'text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]' : ''} 
                      ${idx === 1 ? 'text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]' : ''} 
                      ${idx === 2 ? 'text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]' : ''}`}
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    {item.icon}
                  </motion.div>
                ))}

                {/* Button */}
                <motion.a
                  href="https://www.dropbox.com/scl/fi/xp0h4b7hi3e4sb9waqpwu/AirMouse-Right-Hand.zip?rlkey=40rczhy9gi06j6v0i65cyqfwb&st=u1enjbqn&dl=0"
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-[#5ddcff] to-[#3c67e3] text-white inter-medium shadow-md flex items-center justify-center gap-2 text-nowrap cursor-pointer-custom"
                >
                  <FaDownload />
                  Right-Handed Setup
                </motion.a>
              </motion.div>

              <motion.div
                className="relative group/left-hand w-full sm:w-auto"
                onHoverStart={() => {
                  flyingIconsLeft.forEach((item, idx) => {
                    iconControlsLeft.start(i => i === idx ? {
                      opacity: 1,
                      x: item.x,
                      y: item.y,
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 100, damping: 8, delay: idx * 0.05 }
                    } : {});
                  });
                }}
                onHoverEnd={() => {
                  iconControlsLeft.start(i => ({
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0.5,
                    transition: { duration: 0.3 }
                  }));
                }}
              >
                {/* Animated Icons */}
                {flyingIconsLeft.map((item, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    animate={iconControlsLeft}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                    className={`absolute left-1/2 top-1/2 text-xl pointer-events-none z-0 
                      ${idx === 0 ? 'text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]' : ''} 
                      ${idx === 1 ? 'text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]' : ''} 
                      ${idx === 2 ? 'text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]' : ''}`}
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    {item.icon}
                  </motion.div>
                ))}

                {/* Button */}
                <motion.a
                  href="https://www.dropbox.com/scl/fi/qmhs61ymgsg0307voo7rc/AirMouse-Left-Hand.zip?rlkey=dgux7j0xsrpxevoutu8ra1hge&st=xvh6poji&dl=0"
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-[#ff8a05] to-[#ff3c83] text-white inter-medium shadow-md flex items-center justify-center gap-2 text-nowrap cursor-pointer-custom"
                >
                  <FaDownload />
                  Left-Handed Setup
                </motion.a>
              </motion.div>

              {/* <a
                href="/downloads/AirMouse-left.exe"
                className="w-full px-5 py-4 rounded-xl bg-gradient-to-r from-[#ff8a05] to-[#ff3c83] text-white inter-medium shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-nowrap relative group/left-hand"
              >
                <TbSparkles />
                <IoHandLeftOutline />
                <RiEye2Line />
                <FaDownload />
                Left-Handed Setup
              </a> */}
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-2xl px-8 py-10 shadow-md w-full">
            <h3 className="text-2xl inter-bold text-black mb-4 cursor-select-custom">System Requirements</h3>
            <ul className="space-y-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 cursor-pointer-custom" />
                  <span className="text-black inter-medium cursor-select-custom">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DownloadAndRequirements
