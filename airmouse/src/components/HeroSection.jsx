'use client'

import React, { useRef, useState } from 'react'
import NavBar from './NavBar'
import { motion } from 'framer-motion'
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

  const videoRef = useRef(null);
  const [loopCount, setLoopCount] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleEnded = () => {
    setLoopCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowPlayButton(true);
        return 0; // Reset loop counter
      }
      videoRef.current.play(); // Replay manually
      return newCount;
    });
  };

  const handlePlay = () => {
    setShowPlayButton(false);
    setLoopCount(0);
    videoRef.current.play();
  };

  return (
    <div className='cursor-default-custom relative flex w-screen h-screen overflow-x-hidden overflow-y-hidden'>
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
      <div className='z-10 relative'>
        <NavBar />

        <div className='mt-32 inter-extrabold text-[52px] flex w-full justify-center'>
          {splittedTitle.map((word, index) => (
            <motion.span
              key={index}
              variants={pullupVariant}
              initial='initial'
              whileInView='animate'
              custom={index}
              className='inline-block mr-3 cursor-select-custom'
            >
              {word}{'   '}
            </motion.span>
          ))}
        </div>

        <motion.div 
          className='inter-medium text-lg mt-1.5 flex justify-center w-full cursor-select-custom'
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
              className='inline-block mr-1.5 cursor-select-custom'
            >
              {word}{'.'}
            </motion.span>
          ))}
        </motion.div>

        <div 
          className='flex w-full justify-center mt-8 gap-5'
        >
          <motion.button
            className='bg-gradient-to-r from-20% from-[#3868ed] to-90% to-[#3868ed] hover:from-[#4783f1] hover:to-[#620bcc] text-white inter-medium text-md px-5 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer-custom'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.3 }}
          >
            Download Now
          </motion.button>

          <motion.button 
            className='bg-white hover:bg-[#f1f1f1] border-2 border-[#d9d9d9] text-black inter-medium text-md px-5 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer-custom'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.3 }}
          >
            Watch Demo Video
          </motion.button>
        </div>

        <div className='flex w-full justify-center mt-10 relative'>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className='w-[50%] h-[50%] rounded-2xl shadow-lg z-10 opacity-90 border-8 border-white'
            onEnded={handleEnded}
          >
            <source src='/HeroSectionVideo.mp4' type='video/mp4'/>
          </video>

          {showPlayButton && (
            <button
              onClick={handlePlay}
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-[#dadada] bg-opacity-60 text-black px-[18px] py-3 rounded-full text-lg hover:bg-opacity-80 transition-all z-30 cursor-pointer-custom select-none'
            >
              ▶
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default HeroSection