
"use client"

import { Plus, Search, X } from "lucide-react"
import { Button } from "./ui/button"
import { useGlobalContext } from "./providers/Context"
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
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



export default function BigChannel() {
  const {setIsSidebarOpen, isSidebarOpen, roomId} = useGlobalContext()
  const queryClient = useQueryClient()
  const {data:session} = useSession()
  const {data:rooms} = useQuery({
    queryKey:['chatRooms'],
    queryFn:() => getAllRooms(),
    onSuccess:() => queryClient.invalidateQueries({queryKey:[`messages/${roomId}`, '']})
  })
  return (
    <div className="w-[20.25rem] hidden lg:flex lg:flex-col bg-[#120F13] min-h-screen p-4 items-start relative">
        <div className='flex items-center justify-between w-full'>
      <p className='text-[1.125rem] font-bold text-[#E0E0E0]'>All channels</p>
    <CreateRoomModal />
      </div>
      <div className="bg-[#3C393F] rounded-[.5rem] h-[3rem] w-full mt-[2.22rem] px-[1rem] flex items-center space-x-[.69rem]">
      <Search className="text-white" />
      <input type="text" className="outline-none bg-transparent caret-white text-white placeholder:text-[.875rem] placeholder:font-[500] placeholder:text-[#828282]" placeholder="search" />
      </div>
      <div className="flex flex-col space-y-[1.35rem] mt-[2.19rem] w-full">
        {rooms?.map((room, index) => {
          return <Link href={`/channel/${room.id}`} key={room.id}  className="flex items-center space-x-[.75rem] cursor-pointer">
        <span className="w-[2.625rem] bg-[#252329] rounded-[.5rem] flex items-center justify-center text-center h-[2.625rem]">
        <p className="text-[1.125rem] font-semibold text-white uppercase">{room?.roomName?.split(' ')[0][0]}{room?.roomName?.split(' ')[1]&& room?.roomName?.split(' ')[1][0]}</p>
        </span>
          <h5 className="text-[.875rem] font-bold text-white uppercase">{room.roomName}</h5>
          </Link >
        })}
      </div>
      <div className='bg-[#0B090C] bottom-0 inset-x-0 px-[1rem] py-[1rem] absolute flex items-center w-full'>
      <div className='flex items-center space-x-[1.75rem] '>
          {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{session?.user.name?.slice(0,2)}</span> */}
          <Image src={session?.user.image as string} alt='user avatar' width={42} height={42} />
          <p className='text-[1rem] text-[#828282] font-bold'>{session?.user.name}</p>
        </div>
        <ChevronDown className='text-[#BDBDBD] ml-auto' />
      </div>
    </div>
  )
}
