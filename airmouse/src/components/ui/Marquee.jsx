'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Marquee = () => {

  return (
    <div className='w-screen overflow-hidden bg-black'>
      <div className='flex'>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className='flex items-center py-7 flex-shrink-0'
        >
          <img src='/marquee/01.svg' alt='Presentation Control' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/02.svg' alt='Creative Workflow' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/03.svg' alt='Gaming Sessions' className='h-[27px] mt-1.5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/04.svg' alt='Casual Browsing' className='h-[27px] mt-1.5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/05.svg' alt='Media & Entertainment' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className='flex items-center py-7 flex-shrink-0'
        >
          <img src='/marquee/01.svg' alt='Presentation Control' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/02.svg' alt='Creative Workflow' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/03.svg' alt='Gaming Sessions' className='h-[27px] mt-1.5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/04.svg' alt='Casual Browsing' className='h-[27px] mt-1.5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
          <img src='/marquee/05.svg' alt='Media & Entertainment' className='h-5'/>
          <img src='/marquee/Star.svg' alt='Star' className='h-5 mx-12'/>
        </motion.div>
      </div>
    </div>
  )
}

export default Marquee