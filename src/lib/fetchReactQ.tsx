import axios from "axios"
import { MessageSchema, MessageType } from "./types/zod"
import { isToday, parseISO, isYesterday, format } from "date-fns"

export async function getMessages(roomId:string):Promise<MessageType> {
  const res = await axios(`http://localhost:3000/api/messages/${roomId}`)
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