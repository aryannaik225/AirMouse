'use client'

import React from 'react'
import NavBar from './NavBar'
import { motion } from 'framer-motion'
import { PointerHighlight } from './ui/pointer-highlight'
import { Highlight } from './ui/hero-highlight'

const HeroSection = () => {

  let title = 'Control Your PC with Just Your Hands'
  const splittedTitle = title.split(' ')

  let subtitle = 'No hardware. No controllers. Just pure hand gestures'
  const splittedSubtitle = subtitle.split('.')

  const pullupVariant = {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 20
      },
    })
  }

  const pullupVariant2 = {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 2 + i * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 20
      },
    })
  }

  return (
    <div className='relative flex w-screen h-screen overflow-x-hidden'>
      <div
        className='absolute w-screen h-screen backdrop-blur-lg border border-white/20 shadow-lg'
        style={{
          backgroundColor: 'hsla(0,0%,100%,1)',
          backgroundImage: `
            radial-gradient(at 99% 8%, hsla(189,96%,68%,0.45) 0px, transparent 50%),
            radial-gradient(at 100% 71%, hsla(143,95%,49%,0.31) 0px, transparent 50%),
            radial-gradient(at 0% 48%, hsla(289,95%,63%,0.3) 0px, transparent 50%)
          `
        }}
      />
      <div className='z-10'>
        <NavBar />

        <div className='mt-36 inter-extrabold text-[52px] flex w-full justify-center'>
          {splittedTitle.map((word, index) => (
            <motion.span
              key={index}
              variants={pullupVariant}
              initial='initial'
              whileInView='animate'
              custom={index}
              className='inline-block mr-3'
            >
              {word}{'   '}
            </motion.span>
          ))}
        </div>

        <motion.div 
          className='inter-medium text-lg mt-1.5 flex justify-center w-full'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
        >
            <Highlight className="text-black inter-bold">AirMouse</Highlight> is a gesture-based virtual mouse powered by your webcam.
        </motion.div>

        <motion.div
          className='inter-medium text-lg mt-1.5 flex justify-center w-full'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 100, damping: 20 }}
        >
          {splittedSubtitle.map((word, index) => (
            <motion.span
              key={index}
              variants={pullupVariant2}
              initial='initial'
              whileInView='animate'
              custom={index}
              className='inline-block mr-1.5'
            >
              {word}{'.'}
            </motion.span>
          ))}
        </motion.div>

        <motion.div>
          <motion.button>
            Watch Demo Video
          </motion.button>

          <motion.button>
            Download Now
          </motion.button>
        </motion.div>



      </div>
    </div>
  )
}

export default HeroSection