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

// Register endpoint for both Company and Broker
EmployeerRoute.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, userType, companyName } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !userType) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number format' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const userExists = userType === 'employer' 
      ? await prisma.company.findFirst({ where: { email } })
      : await prisma.broker.findFirst({ where: { email } });

    if (userExists) {
      return res.status(409).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }

    // Create user based on userType
    let newUser;
    
    if (userType === 'employer') {
      if (!companyName) {
        return res.status(400).json({ 
          success: false, 
          message: 'Company name is required for employers' 
        });
      }
      
      newUser = await prisma.company.create({
        data: {
          name: companyName, // Using companyName for the Company's name
          email,
          phone,
          password, // Storing password directly without hashing
        }
      });
    } else if (userType === 'broker') {
      newUser = await prisma.broker.create({
        data: {
          name,
          email,
          phone,
          password, // Storing password directly without hashing
        }
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user type' 
      });
    }

    // Remove password from response
    const userResponse = { ...newUser };
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Original route
EmployeerRoute.get('/', (req, res) => {
    res.send('Employeer Route');
});

module.exports = EmployeerRoute;