/*
  Warnings:

  - You are about to drop the column `userid` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_userid_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "userid";
