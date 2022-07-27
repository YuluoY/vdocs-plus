module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();
    // const adminService = require('../service/adminService');



    app.use('/api/admin/:resource', inflectionMiddleware(), router)
}