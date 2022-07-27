module.exports = app => {
    const router = require('express').Router();
    const restService = require('../service/restService');
    const inflectionMiddleware = require('../middleware/resource');

    router.get('/', async (req, res) => {
        const result = await restService.defaultService(req, res);
        res.send(result);
    })

    app.use('/rest/:resource', inflectionMiddleware(), router)
}