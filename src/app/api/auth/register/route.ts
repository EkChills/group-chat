import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/prisma-client";
import bcrypt from 'bcrypt'

export type UserBody = {
  email:string;
  password:string;
  fullName:string;
}

export async function POST(request:NextRequest) {
  try {
    
    const {email, password,fullName}:UserBody = await request.json()
  
    if(!email ||!password) {
      return new NextResponse('one or more fields are missing', {status:400})
    }

    const exist = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(exist) {
      return new NextResponse('user currently exists', {status:401})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data:{
        email:email,
        password:hashedPassword,
        name:fullName,
        image:`https://robohash.org/${fullName}.png`
      }
    })

  

    return NextResponse.json(user)
    
  } catch (error) {
    console.log(error);
    
  }
}