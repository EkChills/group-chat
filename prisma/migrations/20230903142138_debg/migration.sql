-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_userid_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_chatroomid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatRoomId_fkey";
