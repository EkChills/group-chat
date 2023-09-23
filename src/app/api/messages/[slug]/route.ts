import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma-client";
import { pusherServer } from "@/lib/pusher";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{slug:string}}) {
  try {
    const messages = await db.message.findMany({
      where:{
        chatRoomId:params.slug
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.log(error);
    
  }
}


export interface  TriggeredMessage  {
  name:string;
  text:string;
  image:string;
  sent:string;
}
export async function POST(req:Request) {

  try {
    const {text,roomId}:{text:string, roomId:string} = await req.json()
    const session = await getServerSession(authOptions)
    console.log(text, roomId);
    await pusherServer.trigger(roomId, 'incoming-message', {
      name:session?.user.name,
      text:text,
      image:session?.user.image,
      sent:format(new Date(), 'eeee hh:mm a')
    })


    const message = await db.message.create({
      data:{
        text:text,
        chatRoomId:roomId,
        senderId:session?.userId as string,
        senderImage:session?.user.image as string,
        senderName:session?.user.name as string,
      } 
    })
    return NextResponse.json({
      msg:'success message has been sent',
      message
    })
    
  } catch (error) {
    console.log(error);
    return new NextResponse('something went wrong', {status:500})
    
  }
}

