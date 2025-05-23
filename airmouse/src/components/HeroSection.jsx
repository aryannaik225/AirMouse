'use client'

import React, { useRef, useState } from 'react'
import NavBar from './NavBar'
import { motion } from 'framer-motion'
import { Highlight } from './ui/hero-highlight'
import Image from 'next/image'
import Logo from '../../public/airmouse_final_logo.png'
import { useIsMobile } from './ui/useIsMobile'

const HeroSection = () => {
  const videoRef = useRef(null);
  const [loopCount, setLoopCount] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const isMobile = useIsMobile()

  const handleDownloadClick = () => {
    setShowModal(true)
  }

  const downloadApp = (handedness) => {
    const url =
      handedness === 'right'
        ? 'https://www.dropbox.com/scl/fi/xp0h4b7hi3e4sb9waqpwu/AirMouse-Right-Hand.zip?rlkey=40rczhy9gi06j6v0i65cyqfwb&st=u1enjbqn&dl=0'
        : 'https://www.dropbox.com/scl/fi/qmhs61ymgsg0307voo7rc/AirMouse-Left-Hand.zip?rlkey=dgux7j0xsrpxevoutu8ra1hge&st=xvh6poji&dl=0'

    window.location.href = url
    setShowModal(false)
  }

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

  const handleEnded = () => {
    setLoopCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowPlayButton(true);
        return 0;
      }
      videoRef.current.play();
      return newCount;
    });
  };

  const handlePlay = () => {
    setShowPlayButton(false);
    setLoopCount(0);
    videoRef.current.play();
  };

  return (
    <div className='cursor-default-custom relative flex w-screen min-h-screen overflow-x-hidden overflow-y-hidden'>
      <div
        className='absolute w-full h-full backdrop-blur-lg border border-white/20 shadow-lg'
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
        <NavBar handleDownloadClick={handleDownloadClick} />

        <div className='mt-32 inter-extrabold text-[52px] flex justify-center flex-wrap'>
          {splittedTitle.map((word, index) => (
            <motion.span
              key={index}
              variants={pullupVariant}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
              custom={index}
              className='inline-block mr-3 cursor-select-custom'
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          className='inter-medium text-lg mt-1.5 flex justify-center w-full cursor-select-custom text-center px-4'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 100, damping: 20 }}
        >
          {isMobile ? (
            <>AirMouse</>
          ) : (
            <Highlight className="text-black inter-bold">AirMouse</Highlight>
          )}
          &nbsp;is a gesture-based virtual mouse powered by your webcam.
        </motion.div>

        <motion.div
          className='inter-medium text-lg mt-1.5 flex justify-center w-full flex-wrap'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 100, damping: 20 }}
        >
          {splittedSubtitle.map((word, index) => (
            <motion.span
              key={index}
              variants={pullupVariant2}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
              custom={index}
              className='inline-block mr-1.5 cursor-select-custom'
            >
              {word}.
            </motion.span>
          ))}
        </motion.div>

        <div className='flex justify-center mt-8 gap-5 flex-wrap'>
          <motion.button
            className='bg-gradient-to-r from-[#3868ed] to-[#3868ed] hover:from-[#4783f1] hover:to-[#620bcc] text-white inter-medium text-md px-5 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer-custom'
            onClick={handleDownloadClick}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.1, duration: 0.3 }}
          >
            Download Now
          </motion.button>

          <motion.button
            className='bg-white hover:bg-[#f1f1f1] border-2 border-[#d9d9d9] text-black inter-medium text-md px-5 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer-custom'
            onClick={() => setShowDemo(true)}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.3, duration: 0.3 }}
          >
            Watch Demo Video
          </motion.button>
        </div>

        <motion.div
          className='flex justify-center mt-10 relative px-4 pb-10'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, type: 'spring', stiffness: 100, damping: 20 }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            className='w-full max-w-4xl rounded-2xl shadow-lg z-10 opacity-90 border-8 border-white select-none'
            onEnded={handleEnded}
          >
            <source src='/HeroSectionVideo2.mp4' type='video/mp4' />
          </video>

          {showPlayButton && (
            <button
              onClick={handlePlay}
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-[#dadada] bg-opacity-60 text-black px-[18px] py-3 rounded-full text-lg hover:bg-opacity-80 transition-all z-30 cursor-pointer-custom select-none'
            >
              ▶
            </button>
          )}
        </motion.div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white p-6 rounded-lg text-center w-96">
            <Image src={Logo} alt="AirMouse Logo" width={150} height={150} className="mx-auto mb-4 select-none" draggable="false" />
            <h2 className='text-base inter-bold mb-1 cursor-select-custom'>Are you right or left handed?</h2>
            <span className='text-base inter-regular mb-4 cursor-select-custom'>Answer to allow us in providing you the correct version.</span>
            <div className="flex justify-between gap-4 mt-12">
              <button
                className="bg-[#3868ed] text-white px-4 py-2 rounded-md w-full hover:bg-[#4c7ff5] cursor-pointer-custom"
                onClick={() => downloadApp('right')}
              >
                Right Handed
              </button>
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-md w-full hover:bg-gray-300 cursor-pointer-custom"
                onClick={() => downloadApp('left')}
              >
                Left Handed
              </button>
            </div>
          </div>
        </div>
      )}

      {showDemo && (
        <div
          className='fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] flex items-center justify-center px-4'
          onClick={(e) => e.target === e.currentTarget && setShowDemo(false)}
        >
          <div className='bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl max-h-[90vh]'>
            <div className='relative w-full' style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src="https://www.youtube.com/embed/KQqHYK_NVYY?autoplay=1&rel=0"
                title="AirMouse Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy='strict-origin-when-cross-origin'
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroSection
