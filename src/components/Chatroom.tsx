"use client"

import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { RoomContext } from './providers/Context'
import { SendHorizontal } from 'lucide-react'
import {v4 as uuid} from 'uuid'
import { Button } from './ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { pusherClient } from './PusherWrapper'
import { TriggeredMessage } from '@/app/api/messages/route'
import Message from './Message'
import { getMessages, parseDate } from '@/lib/fetchReactQ'
import { format, parseISO, isToday, isYesterday } from 'date-fns'

export default function Chatroom({roomId}:{roomId:string}) {
  const [incomingMessage, setIncomingMessage] = useState<{id:string, name:string, text:string, image:string, sent:string}[]>([])
  const [message, setMessage] = useState<string>('')
  const {setRoomId, roomId:chatRoomId} = useContext(RoomContext)
  const {data:session} = useSession()
  const { data:initialMessages } = useQuery({ queryKey: [`messages`, {chatRoomId}], queryFn: () => getMessages(chatRoomId) })
  console.log(initialMessages, roomId);
  
  // useEffect(() => {
  // },[roomId, setRoomId])
  console.log(`the room id currently is ${roomId}`);
  
  
  useEffect(() => {
    setRoomId(roomId)
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", ({name, text, image, sent}:TriggeredMessage) => {
      setIncomingMessage((prev) => [...prev!, {id:uuid(), name:name, text, image, sent}]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId, setRoomId]);

  
  async function sendMessage(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(!message) {
      return
    }
    const res = await axios.post('/api/messages', {
      text:message,
      roomId:roomId,
    })
    setMessage('')
    const data = await res.data
    console.log(data);
    
  }

  return (
    <form className='flex flex-col px-[1rem] lg:px-[3.5rem]  pt-[5rem] w-[100vw] lg:w-[calc(100vw-20.25rem)] min-h-screen pb-[6.46rem] max-h-screen overflow-y-scroll' onSubmit={sendMessage} >
      <div className='flex flex-col space-y-[2.37rem]'>
      {initialMessages?.map((msg) => {
        const date = parseDate(msg.createdAt) 
        // const formattedDate = format(date, "eeee hh:mm:ss aaaa")
        return <Message key={msg.id} image={msg.senderImage} name={msg.senderName} sent={date} text={msg.text}/>
      })}
      {incomingMessage.map((msg) => {
        return <Message key={msg.id} {...msg} />
      })}

      </div>
      <div className='flex  h-[3.45rem] lg:h-[3.85rem] rounded-[.75rem] bg-[#3C393F] fixed mt-auto space-x-2 bottom-[1rem] lg:bottom-[2.46rem] lg:left-[23.46rem] left-[1rem] right-[1rem] lg:right-[3.46rem] items-center px-[.59rem] '>
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} className='bg-transparent outline-none indent-5 w-full caret-white text-white' />
        <Button className='bg-[#2F80ED] flex justify-center items-center'>
        <SendHorizontal className='text-[#FFFFFF]' />
        
        </Button>
      </div>
    </form>
  )
}
