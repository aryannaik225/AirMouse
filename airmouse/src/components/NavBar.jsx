import React from 'react'
import Image from 'next/image'
import TitleLogo from '@/../public/airmouse_title.png'

const NavBar = () => {
  return (
    <div className='flex w-full mt-5 justify-between items-center px-20'>
      <div className='items-center flex'>
        <Image
          src={TitleLogo}
          alt='AirMouse Logo'
          width={150}
          height={50}
          className='cursor-pointer'
        />
      </div>
    </div>
  )
}

export default NavBar