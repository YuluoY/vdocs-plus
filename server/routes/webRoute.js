const webService = require("../service/webService");
const {myAssert} = require("../utils");
module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();
    const webService = require('../service/webService');
    const {myAssert} = require('../utils/index')

    router.get('/login', async (req, res, next) => {
        const result = await webService.loginService(req, res);
        myAssert(result, 400, '身份错误！', res);
    })

    router.get('/getArticles', async (req, res) => {
        const result = await webService.getArticlesService(req, res);
        myAssert(result, 401, '文章获取失败！', res);
    })

    router.get('/getLogs', async (req, res) => {
        const result = await webService.getLogsService(req, res);
        myAssert(result, 401, '日志获取失败！', res);
    })

    app.use('/api/web/:resource', inflectionMiddleware(), router)
}