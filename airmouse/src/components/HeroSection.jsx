import React from 'react'

const HeroSection = () => {
  return (
    <div className='relative flex w-screen h-screen overflow-x-hidden'>
      <div
        className='absolute w-screen h-screen z-10 backdrop-blur-lg border border-white/20 shadow-lg'
        style={{
          backgroundColor: 'hsla(0,0%,100%,1)',
          backgroundImage: `
            radial-gradient(at 99% 8%, hsla(189,96%,68%,0.45) 0px, transparent 50%),
            radial-gradient(at 100% 71%, hsla(143,95%,49%,0.31) 0px, transparent 50%),
            radial-gradient(at 0% 48%, hsla(289,95%,63%,0.3) 0px, transparent 50%)
          `
        }}
      />
    </div>
  )
}

export default HeroSection