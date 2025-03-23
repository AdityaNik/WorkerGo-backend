/*
  Warnings:

  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "workers" INTEGER[],
ALTER COLUMN "salary" SET DATA TYPE INTEGER;
