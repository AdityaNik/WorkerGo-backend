const express = require('express');

const AdminRoute = express.Router();

AdminRoute.get('/', (req, res) => {
    res.send('Admin Route');
});

module.exports = AdminRoute;