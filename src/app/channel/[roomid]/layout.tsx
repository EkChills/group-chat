
import Navbar from '@/components/Navbar'
import React from 'react'
import getQueryClient from "@/components/react-query/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import Chatroom from "@/components/Chatroom";
import axios from 'axios';
import { ChatRoomSchema, ChatRoomType } from '@/lib/types/zod';

export async function getRoom(roomId:string):Promise<ChatRoomType> {
  const res = await axios(`http://localhost:3000/api/rooms/${roomId}`)
  const data = await res.data
  ChatRoomSchema.parse(data)
  return data
}



export default async function layout({children,params}:{children:React.ReactNode, params: { roomid: string }}) {

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['room'], () => getRoom(params.roomid))
  const dehydratedState = dehydrate(queryClient)


  
  return (
    <div className='md:flex'>
      {children}
      <Hydrate state={dehydratedState}>
        <div>
        <Navbar />
        <Chatroom roomId={params.roomid} />

        </div>
      </Hydrate>
    </div>
  )
}
