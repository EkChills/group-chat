"use client"

import React, { useContext, useEffect } from 'react'
import {AlignJustify} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { RoomContext } from './providers/Context'
import ReactDOM, {createPortal} from 'react-dom'
import Sidebar from './Sidebar'
import { cn } from '@/lib/utils'
import { getRoom } from '@/lib/fetchReactQ'



export default function Navbar({className}:{className?:string}) {
  const {roomId, isSidebarOpen, setIsSidebarOpen} = useContext(RoomContext)
  const {data} = useQuery({queryKey:['room'], queryFn:() => getRoom(roomId)})
  // useEffect(() => {
  //   const divBody = document.createElement('div')
  //   divBody.id = 'sing-lay'
  //   document.body.appendChild(divBody)
  // },[])

  
  return (
    <>
    <nav className={cn('flex items-center space-x-5 p-4 fixed bg-[#252329] top-0 inset-x-0 lg:left-[20.25em] z-[50] shadow-lg lg:pl-[2.4rem] w-full')}>
      <AlignJustify color='white' className='cursor-pointer lg:hidden' onClick={() => setIsSidebarOpen(true)} />
      <p className='text-[#E0E0E0] font-bold text-[1.125rem] capitalize'>{data?.roomName}</p>
    </nav>
    {/* <Sidebar /> */}
    </>
  )
}
