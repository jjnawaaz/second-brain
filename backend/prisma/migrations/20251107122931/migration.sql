/*
  Warnings:

  - The values [LINK] on the enum `Link` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `desc` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Link_new" AS ENUM ('DOCUMENT', 'TWEET', 'YOUTUBE', 'LINKEDIN');
ALTER TABLE "Content" ALTER COLUMN "type" TYPE "Link_new" USING ("type"::text::"Link_new");
ALTER TYPE "Link" RENAME TO "Link_old";
ALTER TYPE "Link_new" RENAME TO "Link";
DROP TYPE "public"."Link_old";
COMMIT;

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "desc",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "sharableLink" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
