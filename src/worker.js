const express = require('express');

const WorkerRoute = express.Router();

WorkerRoute.get('/', (req, res) => {
    res.send('Worker Route');
});

module.exports = WorkerRoute;