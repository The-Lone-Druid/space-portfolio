/*
  Warnings:

  - You are about to drop the column `project_date` on the `projects` table. All the data in the column will be lost.
  - Added the required column `start_date` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "project_date",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "is_ongoing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
