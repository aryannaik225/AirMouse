import React from 'react'
import Image from 'next/image'
import TitleLogo from '@/../public/airmouse_title.png'
import { Button } from './ui/moving-border'

const NavBar = ({handleDownloadClick}) => {
  return (
    <div className='flex w-screen overflow-x-hidden mt-7 justify-between items-center lg:px-40 md:px-28 sm:px-10 px-5'>
      <a className='items-center flex' href='#'>
        <Image
          src={TitleLogo}
          alt='AirMouse Logo'
          width={160}
          height={50}
          className='cursor-pointer-custom select-none'
          draggable={false}
        />
      </a>
      <div className='flex items-center gap-10 '>
        <a href='#features' className='hidden md:block cursor-pointer-custom group text-black transition duration-300 inter-medium text-md relative'>
          Features
          <span className='absolute left-0 bottom-0 h-0.5 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center'></span>
        </a>
        <a href="#faq" className='hidden md:block cursor-pointer-custom group text-black transition duration-300 inter-medium text-md relative'>
          FAQs
          <span className='absolute left-0 bottom-0 h-0.5 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center'></span>
        </a>
        {/* <button className='inter-medium text-md px-3 py-2 bg-[#f1f1f1]/40 border-2 border-[#878787] rounded text-[#333333] hover:bg-[#f1f1f1] transition duration-300 ease-in-out backdrop-blur-2xl'>
          Download
        </button> */}
        <Button
          borderRadius='1rem'
          className="bg-[#f1f1f1]/60 text-black border-[#878787] px-3 py-2 inter-medium text-base hover:bg-[#f1f1f1] transition duration-300 ease-in-out backdrop-blur-2xl cursor-pointer-custom"
          onClick={handleDownloadClick}
        >
          Download
        </Button>
      </div>
    </div>
  )
}

export default NavBar