module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();
    const webService = require('../service/webService');
    const {myAssert} = require('../utils/index')

    router.get('/login', async (req, res, next) => {
        const result = await webService.loginService(req, res);
        myAssert(result, 400, '身份错误！', res);
    })

    app.use('/api/web/:resource', inflectionMiddleware(), router)
}