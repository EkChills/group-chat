"use client"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useGlobalContext } from "./providers/Context"
import { useQueries, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React, { useLayoutEffect } from 'react'
import { ChatRoomType, MembersSchema, MembersType } from '@/lib/types/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'
import {RemoveScroll} from 'react-remove-scroll'
import Image from 'next/image'
import { baseUrl, getRoom } from '@/lib/fetchReactQ'
import { getMembers } from "./BigSidebar"
import Link from "next/link"


interface Props {

}

const Sidebar = ({}:Props) => {
  const {data:session} = useSession()
  const {roomId} = useGlobalContext()
  const queryResults = useQueries({
    queries:[
      {
        queryKey:[`room`, {roomId}],
        queryFn:() => getRoom(roomId)
      },
      {
        queryKey:[`members`, {roomId}],
        queryFn:() =>getMembers(roomId === '' ? 'clm8haww50001ug189wr86kas' : roomId)
      }
    ]
  })



  const {setIsSidebarOpen, isSidebarOpen} = useGlobalContext()
  return (
    <>
    {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-[100] flex flex-col" >
      <RemoveScroll>
      <div className="absolute  bg-[#120F13] top-0 left-0 bottom-0 right-[4rem] p-4">
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
      {queryResults[1].data?.map((member) => (
        <div key={member.id} className='flex items-center space-x-[1.75rem] '>
          {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{member.name?.slice(0,2)}</span> */}
          <Image src={member.image as string} alt='user avatar' width={42} height={42} />
          <p className='text-[1rem] text-[#828282] font-bold'>{member.name}</p>
        </div>
      ))}
      </div>
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
      </RemoveScroll>
      <Button className="top-[1rem] right-[.4rem] z-50 rounded-lg bg-[#120F13] text-white absolute active:border active:border-white" onClick={() => setIsSidebarOpen(false)} > <X /></Button>

    </div>}
    </>
  )
}

export default Sidebar