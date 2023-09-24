import { db } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{roomId:string}}) {
  try {
    if(params.roomId === 'clmvwua1i0009ugvwkrb44tci'){
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

  export async function POST(req:Request, {params:{roomId}}:{params:{roomId:string}}) {
    try {
      const {name, image, id}:{name:string, image:string, id:string} = await req.json()

      const foundMember =  await db.member.findFirst({
        where:{
          AND:[
            {name:name},
            {chatroomid:roomId},
          ]
        }
      })

      console.log(foundMember);
      

      if(foundMember) {
        console.log('found');
        return NextResponse.json({msg:'room entered'})
      }
 
      const addedMember = await db.member.create({
        data:{
          name,
          image,
          chatroomid:roomId,
        }
      })
      return NextResponse.json(addedMember)
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify(error), {status:500})
      
    }
  }