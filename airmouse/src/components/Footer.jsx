'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => (
  <footer className="py-6 px-6 sm:px-16 bg-white border-t border-black/10">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center text-black/70 inter-medium">
      <span>© 2025 Aryan Naik</span>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <a href="https://github.com/aryannaik225/AirMouse" target="_blank">
          <FaGithub size={20} className="hover:text-black" />
        </a>
        <a href="/LICENSE" className="hover:underline">License</a>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
      </div>
    </div>
  </footer>
)

export default Footer
