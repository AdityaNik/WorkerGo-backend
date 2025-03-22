const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const AdminRoute = express.Router();

// Admin credentials (for simplicity, stored directly in code - not recommended for production)
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
};

// Login endpoint
AdminRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if credentials match
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // For a simple version, we'll just return success
      // In a real app, you would generate a JWT token here
      return res.json({
        success: true,
        message: "Login successful",
        // You could add user data or token here
        admin: { email: ADMIN_CREDENTIALS.email },
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Stats endpoint
AdminRoute.get("/stats", async (req, res) => {
  try {
    const totalWorkers = await prisma.worker.count();
    const totalEmployers = await prisma.company.count();
    const totalBrokers = await prisma.broker.count();
    const totalJobs = await prisma.job.count();

    return res.json({
      totalWorkers,
      totalEmployers,
      totalBrokers,
      totalJobs,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = AdminRoute;
