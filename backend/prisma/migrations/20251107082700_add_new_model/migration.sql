/*
  Warnings:

  - The `tags` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
