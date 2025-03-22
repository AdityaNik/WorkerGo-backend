const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();


router.post('/register', async (req, res) => {

    const { name, phone, skills, location, registeredFrom, experinceLevel } = req.body;

    const worker = {
        name,
        phone,
        skills,
        location,
        availability: true,
        previousJobs: [],
        registeredFrom,
        experinceLevel
    };

    const result = await prisma.worker.create({
        data: worker
    });
    console.log(result);
    res.send(result);
});




router.get('/allWorkers', async (req, res) => {

    const workers = await prisma.worker.findMany();
    console.log(workers);
    res.send(workers);
});

module.exports = router;