-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "skills" TEXT[],
    "location" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "registeredFrom" TEXT NOT NULL,
    "experinceLevel" TEXT NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "need" INTEGER NOT NULL,
    "fullfilled" INTEGER NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "requiredSkills" TEXT[],

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousJobs" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "workerId" INTEGER NOT NULL,

    CONSTRAINT "PreviousJobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreviousJobs" ADD CONSTRAINT "PreviousJobs_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
