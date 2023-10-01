"use client"

import { useQueries, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React, { useRef } from 'react'
import { useGlobalContext } from './providers/Context'
import { ChatRoomType, MembersSchema, MembersType } from '@/lib/types/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'
import Image from 'next/image'
import { baseUrl, getRoom } from '@/lib/fetchReactQ'
import Link from 'next/link'
import Details from './Details'
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside'
import UserMenu from './UserMenu'

export async function getMembers(roomId:string):Promise<MembersType> {
  const res = await axios(`${baseUrl}/api/members/${roomId}`)
  const data = await res.data
  // MembersSchema.parse(data)
  return data
}



export default function BigSidebar() {
  const {data:session} = useSession()
  const {roomId, isLogoutOpen,setIsLogoutOpen} = useGlobalContext()
  // const logoutRef = useRef<HTMLDivElement | null>(null)
  // useOnclickOutside(logoutRef, () => setIsLogoutOpen(false))
  const queryResults = useQueries({
    queries:[
      {
        queryKey:[`room`, {roomId}],
        queryFn:() => getRoom(roomId)
      },
      {
        queryKey:[`members`, {roomId}],
        queryFn:() =>getMembers(roomId)
      }
    ]
  })

console.log(queryResults[1]);

  
  return (
    <div className=' w-[20.25rem] hidden overflow-x-hidden lg:flex lg:flex-col bg-[#120F13] min-h-screen overflow-y-scroll p-4 items-start relative'>
      <Link href={`${baseUrl}/channel/${roomId}/allchanels`} className='flex items-center space-x-4 w-full cursor-pointer'>
      <ChevronLeft className='text-[#E0E0E0]' />
      <p className='text-[1.125rem] font-bold text-[#E0E0E0]'>All channels</p>
      </Link>
      <div className='mt-[2.64rem] flex flex-col space-y-[1.12rem]'>
        <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>{queryResults[0].data?.roomName}</h4>
        <p className="text-[1rem] font-[400] tracking-[-0.03938rem] text-[#E0E0E0]">{queryResults[0].data?.roomDescription}</p>
      </div>
      <div className='mt-[2.72rem]'>
      <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>members</h4>
      <div className='mt-[1.56rem] flex flex-col space-y-[2rem] max-h-[21rem] overflow-y-scroll w-[20.25rem]'>
      {queryResults[1].isLoading ?  <Image alt="loader" src={'/images/gear.svg'} width={25} height={25} className="mx-auto mt-10"/> : queryResults[1].data?.map((member) => (
        <div key={member.id} className='flex items-center space-x-[1.75rem]'>
          {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{member.name?.slice(0,2)}</span> */}
          <Image src={member.image as string} alt='user avatar' width={42} className='rounded-md w-[2.625rem] h-[2.625rem] object-cover' height={42} />
          <p className='text-[1rem] text-[#828282] font-bold'>{member.name}</p>
        </div>
      ))}
      </div>
      </div>
      <UserMenu />
    </div>
  )
}
