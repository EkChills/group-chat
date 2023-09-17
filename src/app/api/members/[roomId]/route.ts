import { db } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{roomId:string}}) {
  try {
    if(params.roomId === 'clm8haww50001ug189wr86kas'){
      const allUsers = await db.user.findMany()
      return NextResponse.json(allUsers)
    }
    const members = await db.member.findMany({
      where:{
        chatroomid:params.roomId
      }
    })

    return NextResponse.json(members)
  } catch (error) {
    console.log(error);
    return new NextResponse('damn theres an error', {status:500})
  }
}