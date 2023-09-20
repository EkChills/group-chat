import { pusherClient } from "@/components/PusherWrapper";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { ChatRoomSchema, ChatRoomType } from "@/lib/types/zod";
import getQueryClient from "@/components/react-query/queryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import Chatroom from "@/components/Chatroom";
import Sidebar from "@/components/Sidebar";
import BigSidebar from "@/components/BigSidebar";
import { baseUrl } from "@/lib/fetchReactQ";
import SmallChannel from "@/components/SmallChanels";
import BigChannel from "@/components/BigChannel";


export default async function SingleRoom({ params }: { params: { roomid: string } }) {
  // const [incomingMessages, setIncomingMessages] = useState<{email:string, text:string}[]>([]);
  // const inputRef = useRef<HTMLInputElement>(null)
  // const {data:session} = useSession()

  // useEffect(() => {
  //   pusherClient.subscribe(params.roomid);

  //   pusherClient.bind("incoming-message", ({email, text}:{email:string, text:string}) => {
  //     setIncomingMessages((prev) => [...prev!, {email:email, text}]);
  //   });

  //   return () => {
  //     pusherClient.unsubscribe(params.roomid);
  //   };
  // }, []);

  // async function sendMessage() {
  //   const res = await axios.post('/api/messages', {
  //     text:inputRef.current?.value,
  //     roomId:params.roomid
  //   })
  //   const data = await res.data
  //   console.log(data);
    
  // }

  // const room = await getRoom(params.roomid)
  // const queryClient = getQueryClient()
  // await queryClient.prefetchQuery(['room'], () => getRoom(params.roomid))
  // const dehydratedState = dehydrate(queryClient)
  

  return (
    <main>
      {/* <Hydrate state={dehydratedState}>
        <Chatroom roomId={params.roomid} />
      </Hydrate> */}
      {/* <Navbar className="md:hidden" /> */}
      <SmallChannel />
      <BigChannel />
    </main>
  );
}
