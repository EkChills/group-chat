
import axios from 'axios'
import { redirect, } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, {  useEffect, useRef } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export  default async function Home() {
const session = await getServerSession(authOptions)
console.log(session);
if(session) {
  redirect(`/channel/clmv3rymz0004ug1c3scn6c6g`)
}
  
  // async function addChannel() {
  //   const res = await axios('/api/rooms/create')
  //   const data = await res.data
  //   console.log(data)
    
  //   router.push(`/channel/${data.roomid}`)
  // }

  // useEffect(() => {
  //   if(!session) {
  //     return redirect(`/channel/clm8haww50001ug189wr86kas`)
  //   }
  // },[])



  return (
    <div className='text-2xl font-bold'>
      <button >create</button>
      
    </div>
  )
}
