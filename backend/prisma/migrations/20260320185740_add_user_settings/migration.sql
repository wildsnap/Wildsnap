-- CreateEnum
CREATE TYPE "ScreenMode" AS ENUM ('light', 'dark');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'th');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "hasMusic" BOOLEAN NOT NULL DEFAULT true,
    "hasSound" BOOLEAN NOT NULL DEFAULT true,
    "hasVibration" BOOLEAN NOT NULL DEFAULT true,
    "screenMode" "ScreenMode" NOT NULL DEFAULT 'light',
    "language" "Language" NOT NULL DEFAULT 'en',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
