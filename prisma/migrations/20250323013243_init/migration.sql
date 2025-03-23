-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "skills" TEXT[],
    "location" TEXT,
    "availability" BOOLEAN,
    "registeredFrom" TEXT,
    "experinceLevel" TEXT,
    "previousJobs" INTEGER[],
    "isjobless" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jobs" INTEGER[],

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Broker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
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
    "salary" INTEGER NOT NULL,
    "requiredSkills" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" INTEGER,
    "workers" INTEGER[],

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
