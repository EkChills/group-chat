/*
  Warnings:

  - Added the required column `chatroomid` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "chatroomid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_chatroomid_fkey" FOREIGN KEY ("chatroomid") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
