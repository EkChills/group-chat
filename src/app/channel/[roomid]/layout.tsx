
import Navbar from '@/components/Navbar'
import React from 'react'
import getQueryClient from "@/components/react-query/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import Chatroom from "@/components/Chatroom";
import axios from 'axios';
import { ChatRoomSchema, ChatRoomType } from '@/lib/types/zod';
import { baseUrl, getRoom } from '@/lib/fetchReactQ';
import FramerTransition from '@/components/providers/FramerTransition';




export default async function layout({children,params}:{children:React.ReactNode, params: { roomid: string }}) {

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery([`room`, {roomId:params.roomid}], () => getRoom(params.roomid))
  const dehydratedState = dehydrate(queryClient)


  
  return (
    <div className='md:flex bg-[#252329]'>
      {children}
      <Hydrate state={dehydratedState}>
        <FramerTransition>
        <div>
        <Navbar />
        <Chatroom roomId={params.roomid} />

        </div>

        </FramerTransition>
      </Hydrate>
    </div>
  )
}
