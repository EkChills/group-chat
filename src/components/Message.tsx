"use client"

import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { TriggeredMessage } from "./Chatroom"
import { motion } from "framer-motion"


interface Msg extends TriggeredMessage {
  msgIndex?:number
}


const Message = ({image,name,sent,text, msgIndex}:Msg ) => {

  const variants = {
    visible: (i:number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
  }
  
  
  return (
    <motion.div className="flex space-x-[1.75rem] items-start" custom={msgIndex} variants={variants} animate="visible" initial="hidden" >
        <Image src={image as string} alt='user avatar' width={42} height={42} />
        <div className="flex flex-col space-y-[.5rem]">
          <div className="flex items-center space-x-4">
            <p className="text-[#828282] font-bold text-[1.125rem] capitalize">{name}</p>
            <p className="text-[.75rem] font-[500] text-[#828282]">{sent}</p>
          </div>
          <p className="text-sm font-[500] text-[#E0E0E0]">{text}</p>
        </div>
    </motion.div>
  )
}

export default Message