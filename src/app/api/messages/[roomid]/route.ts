import { db } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{roomId:string}}) {
  try {
    const messages = await db.message.findMany({
      where:{
        chatRoomId:params.roomId
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.log(error);
    
  }
}