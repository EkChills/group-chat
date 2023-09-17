import { TriggeredMessage } from "@/app/api/messages/route"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import Image from "next/image"



const Message = ({image,name,sent,text}:TriggeredMessage) => {
  return (
    <div className="flex space-x-[1.75rem] items-start">
        <Image src={image as string} alt='user avatar' width={42} height={42} />
        <div className="flex flex-col space-y-[.5rem]">
          <div className="flex items-center space-x-4">
            <p className="text-[#828282] font-bold text-[1.125rem] capitalize">{name}</p>
            <p className="text-[.875rem] font-[500] text-[#828282]">{sent}</p>
          </div>
          <p className="text-[1.125rem] font-[500] text-[#E0E0E0]">{text}</p>
        </div>
    </div>
  )
}

export default Message