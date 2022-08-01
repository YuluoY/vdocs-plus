module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();
    const adminService = require('../service/adminService');


    router.post('/addArticle', async (req, res, next) => {
        const result = await adminService.addArticleService(req.body, req, res);
        console.log(result)
        res.send('1');
    })

    app.use('/api/admin/:resource', inflectionMiddleware(), router)
}