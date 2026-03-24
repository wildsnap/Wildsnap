/*
  Warnings:

  - The values [ANIMAL_DECORATION] on the enum `ItemType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemType_new" AS ENUM ('AVATAR_OUTFIT', 'AVATAR_ACCESSORY', 'HEAD', 'BODY', 'LEG', 'REAL_WORLD_COUPON');
ALTER TABLE "Item" ALTER COLUMN "type" TYPE "ItemType_new" USING ("type"::text::"ItemType_new");
ALTER TYPE "ItemType" RENAME TO "ItemType_old";
ALTER TYPE "ItemType_new" RENAME TO "ItemType";
DROP TYPE "public"."ItemType_old";
COMMIT;
