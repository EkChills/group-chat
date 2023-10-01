"use client"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useGlobalContext } from "./providers/Context"
import { useQueries, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ChatRoomType, MembersSchema, MembersType } from '@/lib/types/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'
import {RemoveScroll} from 'react-remove-scroll'
import Image from 'next/image'
import { baseUrl, getRoom } from '@/lib/fetchReactQ'
import { getMembers } from "./BigSidebar"
import Link from "next/link"
import {motion} from 'framer-motion'
import AnimatePresence from "./providers/AnimateProvider"
import AnimateProvider from "./providers/AnimateProvider"
import UserMenu from "./UserMenu"
import SmallUserMenu from "./SmallUserMenu"

interface Props {

}

const Sidebar = ({}:Props) => {
  const {data:session} = useSession()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const {roomId} = useGlobalContext()
  const queryResults = useQueries({
    queries:[
      {
        queryKey:[`room`, {roomId}],
        queryFn:() => getRoom(roomId)
      },
      {
        queryKey:[`members`, {roomId}],
        queryFn:() =>getMembers(roomId === '' ? 'clmvwua1i0009ugvwkrb44tci' : roomId)
      }
    ]
  })


  const variants = {
    open: { opacity: 1,
       x: 0,
       transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
    closed: { opacity: 0,
       x: -100,
       transition: {
        when: "afterChildren",
      }, 
      },
  }

  const {setIsSidebarOpen, isSidebarOpen} = useGlobalContext()

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
    <AnimateProvider>
    {isSidebarOpen && <motion.div className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-[100] flex flex-col" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}  >
      <RemoveScroll>
      <motion.div className="absolute  bg-[#120F13] top-0 left-0 bottom-0 right-[4rem] p-4" variants={variants} initial="closed" animate="open" exit={{opacity:0}}  >
      <Link href={`${baseUrl}/channel/${roomId}/allchanels`} className='flex items-center space-x-4 cursor-pointer'>
      <ChevronLeft className='text-[#E0E0E0]' />
      <p className='text-[1.125rem] font-bold text-[#E0E0E0]'>All channels</p>
      </Link>
      <div className='mt-[2.64rem] flex flex-col space-y-[1.12rem]'>
        <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>{queryResults[0].data?.roomName}</h4>
        <p className="text-[1rem] font-[400] tracking-[-0.03938rem] text-[#E0E0E0]">{queryResults[0].data?.roomDescription}</p>
      </div>
      <div className='mt-[2.72rem]'>
      <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>members</h4>
      <div className='mt-[1.56rem] flex flex-col space-y-[2rem] max-h-[20rem] overflow-y-scroll'>
      {queryResults[1].isLoading ?  <Image alt="loader" src={'/images/gear.svg'} width={25} height={25} className="mx-auto mt-10"/> : queryResults[1].data?.map((member) => (
        <div key={member.id} className='flex items-center space-x-[1.75rem] '>
          {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{member.name?.slice(0,2)}</span> */}
          <Image src={member.image as string} className="rounded-md w-[2.625rem] h-[2.625rem] object-cover" alt='user avatar' width={42} height={42} />
          <p className='text-[1rem] text-[#828282] font-bold'>{member.name}</p>
        </div>
      ))}
      </div>
      </div>
      { isMounted && <SmallUserMenu />}
      </motion.div>
      </RemoveScroll>
      <Button className="top-[1rem] right-[.4rem] z-50 rounded-lg bg-[#120F13] text-white absolute active:border active:border-white" onClick={() => setIsSidebarOpen(false)} > <X /></Button>

    </motion.div>}
    </AnimateProvider>
    </>
  )
}

export default Sidebar