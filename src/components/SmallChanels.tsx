
"use client"

import { Plus, Search, X } from "lucide-react"
import { Button } from "./ui/button"
import { useGlobalContext } from "./providers/Context"
import { useQueries, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React from 'react'
import { ChatRoomType, MembersSchema, MembersType } from '@/lib/types/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'
import Image from 'next/image'
import { baseUrl, getAllRooms, getRoom } from '@/lib/fetchReactQ'
import { getMembers } from "./BigSidebar"
import Link from "next/link"
import { CreateRoomModal } from "./CreateRoomModal"
import { useRouter } from "next/navigation"
import { RemoveScroll } from "react-remove-scroll"
import {motion} from 'framer-motion'
import UserMenu from "./UserMenu"
import SmallUserMenu from "./SmallUserMenu"


interface Props {

}

const SmallChannel = ({}:Props) => {
  
  const {setIsSidebarOpen, isSidebarOpen} = useGlobalContext()
  const {data:session} = useSession()
  const router = useRouter()
  const {data:rooms, isLoading} = useQuery({
    queryKey:['chatRooms'],
    queryFn:() => getAllRooms(),
    staleTime:0
  })
  console.log(rooms);

  const enterRoom = async(roomId:string) => {
    await axios.post(`/api/members/${roomId}`, {name:session?.user.name, image:session?.user.image, id:session?.userId})
    router.push(`/channel/${roomId}`)
    setIsSidebarOpen(false)

  }

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

  
  return (
    <>
    {isSidebarOpen && <motion.div className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-[100] flex flex-col" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} >
      <RemoveScroll>
      <motion.div className="absolute  bg-[#120F13] top-0 left-0 bottom-0 right-[4rem] p-4" variants={variants} initial="closed" animate="open">
      <div className='flex items-center justify-between'>
      <p className='text-[1.125rem] font-bold text-[#E0E0E0]'>All channels</p>
      <CreateRoomModal />
      </div>
      <div className="bg-[#3C393F] rounded-[.5rem] h-[3rem] w-full mt-[2.22rem] px-[1rem] flex items-center space-x-[.69rem]">
        <div className="w-[2rem]">

      <Search className="text-white w-[2rem] text-[2rem]" />
        </div>
      <input type="text" className="outline-none bg-transparent caret-white text-white placeholder:text-[.875rem] placeholder:font-[500] placeholder:text-[#828282]" placeholder="search" />
      </div>
      <div className="flex flex-col space-y-[1.35rem] mt-[2.19rem]  max-h-[20rem] overflow-y-scroll">
        {isLoading ?  <Image alt="loader" src={'/images/gear.svg'} width={25} height={25} className="mx-auto mt-10"/> : rooms?.map((room, index) => {
          return <div  key={room.id} onClick={() => enterRoom(room.id)} className="flex items-center space-x-[.75rem] hover:cursor-pointer">
        <span className="w-[2.625rem] bg-[#252329] rounded-[.5rem] flex items-center justify-center text-center h-[2.625rem]">
    <p className="text-[1.125rem] font-semibold text-white uppercase">{room?.roomName?.split(' ')[0][0]}{room?.roomName?.split(' ')[1]&& room?.roomName?.split(' ')[1][0]}</p>
        </span>
          <h5 className="text-[.875rem] font-bold text-white uppercase">{room.roomName}</h5>
          </div>
        })}
      </div>
        <SmallUserMenu /> 
  
      </motion.div>
      </RemoveScroll>
      <Button className="top-[1rem] right-[.4rem] z-50 rounded-lg bg-[#120F13] text-white absolute active:border active:border-white" onClick={() => setIsSidebarOpen(false)} > <X /></Button>

    </motion.div>}
    </>
  )
}

export default SmallChannel