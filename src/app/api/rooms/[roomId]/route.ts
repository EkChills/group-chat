import { db } from "@/lib/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest, {params}:{params:{roomId:string}}) {
  try {
    const {roomId} = params
    console.log(roomId);
    
    const singleRoom = await db.chatRoom.findUnique({
      where:{
        id:roomId
      }
    }) 
    return NextResponse.json(singleRoom)
  } catch (error) {
    console.log(error);
    
    return new NextResponse('something went wrong', {status:500})
  }
  
}