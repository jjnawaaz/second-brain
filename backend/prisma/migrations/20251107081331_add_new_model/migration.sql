-- CreateEnum
CREATE TYPE "Link" AS ENUM ('DOCUMENT', 'TWEET', 'YOUTUBE', 'LINK');

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "type" "Link" NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
