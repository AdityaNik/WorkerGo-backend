const express = require('express');
const { PrismaClient } = require('@prisma/client');
const EmployeerRoute = express.Router();
const prisma = new PrismaClient();

// Middleware for request body parsing
EmployeerRoute.use(express.json());

EmployeerRoute.post('/createjob', async (req, res) => {
    console.log("Job request received:", req.body);

    try {
        const { jobTitle, companyName, locality, startDate, totalDays, description, need, salary, requiredSkills } = req.body;

        // Check if required fields are missing
        // if (!jobTitle || !companyName || !locality || !startDate || !totalDays || !description || !need || !salary || !requiredSkills) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'All fields are required',
        //     });
        // }

        // // Validate date format
        // if (!isValidDate(startDate)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Invalid start date format',
        //     });
        // }

        // // Ensure `need` and `salary` are numbers
        // if (isNaN(need) || isNaN(salary)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Need and Salary must be valid numbers',
        //     });
        // }

        // // Check if job with the same title already exists
        // const jobExists = await prisma.job.findFirst({
        //     where: { jobTitle, companyName, locality },
        // });

        // if (jobExists) {
        //     return res.status(409).json({
        //         success: false,
        //         message: 'A job with this title at the same company and location already exists',
        //     });
        // }

        // Create a new job with `fullfilled` set to 0 by default
        const newJob = await prisma.job.create({
            data: {
                jobTitle,
                companyName,
                locality,
                startDate: new Date(startDate),
                totalDays: parseInt(totalDays),
                description,
                need: parseInt(need),
                fullfilled: 0, // Always starts at 0
                salary: parseFloat(salary),
                requiredSkills,
            },
        });

        console.log("Job created successfully:", newJob);

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            job: newJob,
        });

    } catch (error) {
        console.error('Job creation error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the job',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
            message: 'An error occurred during job retrieval'
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


EmployeerRoute.post('/withdrawjob', async (req, res) => {
  // console.log("Job request received:", req.body);
  try {
      const { jobId, workerId } = req.body;
      console.log("jobid: ", jobId);
      console.log("workerid: ", workerId);
      const job = await prisma.job.findUnique({
          where: {
              id: parseInt(jobId)
          }
      });
      if (!job) {
          return res.status(404).json({
              success: false,
              message: 'Job not found'
          });
      }
      const updatedJob = await prisma.job.update({
          where: {
              id: parseInt(jobId)
          },
          data: {
              workers: job.workers.filter((id) => id !== parseInt(workerId))
          }
      });
      console.log(updatedJob);
      res.send(updatedJob);
  } catch (error) {
      console.error('Job retrieval error:', error);
      res.status(500).json({
          success: false,
          message: 'An error occurred during job retrieval',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// Add this endpoint to your EmployeerRoute.js file
EmployeerRoute.get('/job/:id/workers', async (req, res) => {
  const jobId = parseInt(req.params.id);
  
  try {
    // First, find the job to get the worker IDs
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // If the job has no workers, return an empty array
    if (!job.workers || job.workers.length === 0) {
      return res.status(200).json([]);
    }
    
    // Fetch the worker details based on the IDs in the job.workers array
    const workers = await prisma.worker.findMany({
      where: {
        id: { in: job.workers }
      }
    });
    
    res.status(200).json(workers);
  } catch (error) {
    console.error('Error fetching job workers:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching workers for this job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = EmployeerRoute;