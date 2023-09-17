"use client"

import { useQueries, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React from 'react'
import { useGlobalContext } from './providers/Context'
import { ChatRoomType, MembersSchema, MembersType } from '@/lib/types/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'
import Image from 'next/image'
import { baseUrl, getRoom } from '@/lib/fetchReactQ'

export async function getMembers(roomId:string):Promise<MembersType> {
  const res = await axios(`${baseUrl}/api/members/${roomId}`)
  const data = await res.data
  MembersSchema.parse(data)
  return data
}



export default function BigSidebar() {
  const {data:session} = useSession()
  const {roomId} = useGlobalContext()
  const queryResults = useQueries({
    queries:[
      {
        queryKey:['room'],
        queryFn:() => getRoom(roomId)
      },
      {
        queryKey:['members'],
        queryFn:() =>getMembers(roomId === '' ? 'clm8haww50001ug189wr86kas' : roomId)
      }
    ]
  })

console.log(queryResults[1]);

  
  return (
    <div className=' w-[20.25rem] hidden lg:flex lg:flex-col bg-[#120F13] min-h-screen p-4 items-start relative'>
      <div className='flex items-center space-x-4'>
      <ChevronLeft className='text-[#E0E0E0]' />
      <p className='text-[1.125rem] font-bold text-[#E0E0E0]'>All channels</p>
      </div>
      <div className='mt-[2.64rem] flex flex-col space-y-[1.12rem]'>
        <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>{queryResults[0].data?.roomName}</h4>
        <p className="text-[1rem] font-[400] tracking-[-0.03938rem] text-[#E0E0E0]">{queryResults[0].data?.roomDescription}</p>
      </div>
      <div className='mt-[2.72rem]'>
      <h4 className='text-[1.125rem] text-[#E0E0E0] font-bold uppercase'>members</h4>
      <div className='mt-[1.56rem] flex flex-col space-y-[2rem]'>
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
  )
}
