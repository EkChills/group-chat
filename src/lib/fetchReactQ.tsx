import axios from "axios"
import { MessageSchema, MessageType } from "./types/zod"
import { isToday, parseISO, isYesterday, format } from "date-fns"

export async function getMessages(roomId:string):Promise<MessageType> {
  const res = await axios(`${baseUrl}/api/messages/${roomId}`)
  const data = await res.data
  MessageSchema.parse(data)
  return data
}

export function parseDate (date:string):string {
  let parsed = parseISO(date);
  if(isToday(parsed)){
    return 'Today at ' + format(parsed, 'h:mm a')
  } else if(isYesterday(parsed)) {
    return 'Yesterday at ' + format(parsed, 'h:mm a') 
  } else {
    return format(parsed, 'eeee at h:mm a') 
  }
}

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://group-chat-woad.vercel.app' : 'http://localhost:3000'