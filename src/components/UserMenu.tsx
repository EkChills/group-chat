"use client"

import { ChevronDown } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Details from "./Details"
import { useGlobalContext } from "./providers/Context"
import AnimateProvider from "./providers/AnimateProvider"
import { useOnClickOutside } from "@/lib/hooks/useOnClickOutside"

interface Props {

}

const UserMenu = ({}:Props) => {
  const {data:session} = useSession()
  const logoutRef = useRef<HTMLDivElement | null>(null)
  const {isLogoutOpen, setIsLogoutOpen} = useGlobalContext()
  function closeLogout(e:MouseEvent | TouchEvent) {
    setIsLogoutOpen(false)
  }
  useOnClickOutside(logoutRef, closeLogout)
  


  return (
    <div className='bg-[#0B090C] bottom-0 inset-x-0 px-[1rem] py-[1rem] absolute flex items-center w-full'>
    <div className='flex items-center space-x-[1.75rem] relative'>
        {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{session?.user.name?.slice(0,2)}</span> */}
        <Image src={session?.user.image as string} alt='user avatar' className="rounded-md" width={42} height={42} />
        <p className='text-[1rem] text-[#828282] font-bold'>{session?.user.name}</p>
        {isLogoutOpen && <AnimateProvider> <Details ref={logoutRef} className='absolute w-[12rem]  left-[4.6rem] py-[1rem] bottom-8' /></AnimateProvider>}
      </div>
      <ChevronDown className='text-[#BDBDBD] ml-auto cursor-pointer' onClick={() => setIsLogoutOpen(true)} />
    </div>
  )
}

export default UserMenu