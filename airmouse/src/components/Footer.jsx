'use client'

import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { SiLinkedin } from "react-icons/si";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="cursor-default-custom w-screen overflow-x-hidden relative mt-24 px-6 sm:px-16 py-5 bg-white border-t border-neutral-200 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6"
      >
        {/* Logo and Text */}
        <a href='#' className="flex items-center gap-3 cursor-pointer-custom">
          <Image src="/airmouse_title.png" alt="AirMouse Logo" width={160} height={40} draggable={false} className='select-none' />
        </a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative z-10 text-center text-neutral-500 text-sm"
        >
          © {new Date().getFullYear()} AirMouse. Built with passion ✨
        </motion.div>

        {/* GitHub & Linkedin */}
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/aryannaik225/AirMouse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-700 hover:text-black transition"
          >
            <FaGithub className="text-xl cursor-pointer-custom" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/aryannaik225/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-700 hover:text-black transition"
          >
            <SiLinkedin className="text-xl cursor-pointer-custom" />
          </Link>
        </div>
      </motion.div>  
    </footer>
  )
}

export default Footer
