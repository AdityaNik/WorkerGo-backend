const express = require('express');

const EmployeerRoute = express.Router();

EmployeerRoute.get('/', (req, res) => {
    res.send('Employeer Route');
});

module.exports = EmployeerRoute;