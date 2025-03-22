const express = require('express');
const PrismaClient = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();


router.post('/register', async (req, res) => {

    const { name, phone, skills, location } = req.body;

    const worker = {
        name,
        phone,
        skills,
        location,
        availability: true,
        previousJobs: []
    };

    const result = await prisma.worker.create({
        data: worker
    });
    console.log(result);
    res.send(result);
});




router.get('/', (req, res) => {
    res.send('Worker Route');
});

module.exports = router;