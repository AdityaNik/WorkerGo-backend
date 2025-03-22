const express = require('express');
const { PrismaClient } = require('@prisma/client');
const EmployeerRoute = express.Router();
const prisma = new PrismaClient();

// Middleware for request body parsing
EmployeerRoute.use(express.json());

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate phone number format
const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10,12}$/; // Simple validation for 10-12 digit phone numbers
  return phoneRegex.test(phone);
};

EmployeerRoute.post('/createjob', async (req, res) => {
    console.log("Job request received:", req.body);
    try {
      const { jobTitle, companyName, locality, startDate, totalDays, description, need, salary, requiredSkills } = req.body;
  
      // Basic validation
      if (!jobTitle || !companyName || !locality || !startDate || !totalDays || !description || !need || !salary || !requiredSkills) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }
  
      if (!isValidDate(startDate)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid start date format'
        });
      }
  
      // Check if job already exists
      const jobExists = await prisma.job.findFirst({ where: { jobTitle } });
  
      if (jobExists) {
        return res.status(409).json({
          success: false,
          message: 'Job with this title already exists'
        });
      }
  
      // Create job with fullfilled set to 0 by default
      const newJob = await prisma.job.create({
        data: {
          jobTitle,
          companyName,
          locality,
          startDate,
          totalDays,
          description,
          need,
          fullfilled: 0, // Set to 0 by default
          salary,
          requiredSkills
        }
      });
  
      console.log("Job created successfully:", newJob);
      res.status(201).json({
        success: true,
        message: 'Job created successfully',
        job: newJob
      });
  
    } catch (error) {
      console.error('Job creation error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred during job creation',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
  

EmployeerRoute.get('/jobs', async (req, res) => {
    console.log("Job request received:", req.body);
    try {
        const jobs = await prisma.job.findMany();
        console.log(jobs);
        res.send(jobs);
    } catch (error) {
        console.error('Job retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during job retrieval',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

//Get all who accepted the job
EmployeerRoute.get('/acceptedjobs', async (req, res) => {
    console.log("Job request received:", req.body);
    try {
        const jobs = await prisma.job.findMany({
            where: {
                fullfilled: true
            }
        });
        console.log(jobs);
        res.send(jobs);
    } catch (error) {
        console.error('Job retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during job retrieval',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});


EmployeerRoute.post('/register', async (req, res) => {
    try {
      const cmp = req.body;
      console.log(cmp);
    //   if (!email || !password || !phone || !userType) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //   }
      
    //   if (userType === 'employer' && !companyName) {
    //     return res.status(400).json({ message: 'Company name is required' });
    //   }
  
    //   if (userType === 'broker' && !name) {
    //     return res.status(400).json({ message: 'Broker name is required' });
    //   }
  
    //   const userExists = await prisma.company.findFirst({ where: { email } });
    //   if (userExists) {
    //     return res.status(409).json({ message: 'User already exists' });
    //   }
  
      const newUser = await prisma.company.create({
        data: {
          name: cmp.companyName,
          email: cmp.email,
          phone: cmp.phone,
          password: cmp.password, // Hashing should be added in production
        }
      });
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });


  EmployeerRoute.post('/registerBroker', async (req, res) => {
    try {
      const cmp = req.body;
      console.log(cmp);
    //   if (!email || !password || !phone || !userType) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //   }
      
    //   if (userType === 'employer' && !companyName) {
    //     return res.status(400).json({ message: 'Company name is required' });
    //   }
  
    //   if (userType === 'broker' && !name) {
    //     return res.status(400).json({ message: 'Broker name is required' });
    //   }
  
    //   const userExists = await prisma.company.findFirst({ where: { email } });
    //   if (userExists) {
    //     return res.status(409).json({ message: 'User already exists' });
    //   }
  
      const newUser = await prisma.broker.create({
        data: {
          name: cmp.name,
          email: cmp.email,
          phone: cmp.phone,
          password: cmp.password, // Hashing should be added in production
        }
      });
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });

EmployeerRoute.get('/brokerlogin', async (req, res) => {
    try {
      const cmp = req.body;
      console.log(cmp);
      const user = await prisma.broker.findFirst({ where: { email: cmp.email } });
      if (user) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });

  EmployeerRoute.get('/employerlogin', async (req, res) => {
    try {
      const cmp = req.body;
      console.log(cmp);
      const user = await prisma.company.findFirst({ where: { email: cmp.email } });
      if (user) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = EmployeerRoute;