import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

  try {
    const session = await getServerSession(authOptions)
    const {roomName, roomDescription}:{roomName:string; roomDescription:string;} = await req.json()
    
  
    const newRoom = await db.chatRoom.create({
      data:{
        userid:'clmv3qpug0002ug1ckoft33hx',
        roomName,
        roomDescription
      }
    })

    return NextResponse.json(newRoom)
    
  } catch (error) {
    console.log(error);
    
    return new NextResponse('something went wrong', {status:500})
  }
}