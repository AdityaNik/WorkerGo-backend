const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const AdminRoute = express.Router();

AdminRoute.get("/stats", async (req, res) => {
  try {
    const totalWorkers = await prisma.worker.count();
    const totalEmployers = await prisma.company.count();
    const totalBrokerers = await prisma.company.count();
    const totalJobs = await prisma.job.count();

    // If you have a brokers table, uncomment the next line
    // const totalBrokers = await prisma.broker.count();

    return res.json({
      totalWorkers,
      totalEmployers,
      totalJobs,
      // totalBrokers  // Uncomment this if you have brokers
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = AdminRoute;
