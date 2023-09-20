import { db } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chatRooms = await db.chatRoom.findMany()
    return NextResponse.json(chatRooms)
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {status:500})
  }
}