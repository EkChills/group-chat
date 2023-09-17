import {z} from 'zod'

// id        String       @id @default(cuid())
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   messages  Message[]
//   members  Member[]
//   roomName String?
//   roomDescription String?
//   userid String

export const ChatRoomSchema = z.object({
  id:z.string().cuid(),
  createdAt:z. string().datetime(),
  updatedAt:z.string().datetime(),
  roomName:z.string(),
  roomDescription:z.string(),
  userid:z.string()
})

export type ChatRoomType = z.infer<typeof ChatRoomSchema>



export const MembersSchema = z.array(z.object({
  id:z.string().cuid(),
  name:z.union([ z.string(), z.null()]).optional(),
  email:z.string().optional(),
  emailVerified:z.union([ z.string(), z.null(), z.boolean()]).optional(),
  image:z.union([ z.string(), z.null()]).optional(),
  password:z.string().optional(),
  createdAt:z. string().datetime().optional(),
  updatedAt:z.string().datetime().optional(),
  chatroomid:z.string().optional()
}) )

export type MembersType = z.infer<typeof MembersSchema> 

export const MessageSchema = z.array(z.object({
  id:z.string(),
  senderId:z.string(),
  senderImage:z.string(),
  createdAt:z.string(),
  updatedAt:z.string(),
  text:z.string(),
  chatRoomId:z.string(),
  senderName:z.string()
}))

export type MessageType = z.infer<typeof MessageSchema> 

