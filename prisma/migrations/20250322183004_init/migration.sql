-- DropForeignKey
ALTER TABLE "PreviousJobs" DROP CONSTRAINT "PreviousJobs_workerId_fkey";

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "previousJobs" INTEGER[],
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL,
ALTER COLUMN "registeredFrom" DROP NOT NULL,
ALTER COLUMN "experinceLevel" DROP NOT NULL;
