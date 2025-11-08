-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userId_fkey";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
