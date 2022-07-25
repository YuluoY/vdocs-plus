module.exports = app => {
    const router = require('express').Router();
    const restService = require('../service/restService');
    const inflectionMiddleware = require('../middleware/resource');

    router.get('/', (req, res) => {
        const result = restService.defaultService(req, res);
        res.send(result);
    })


    app.use('/web/:resource', inflectionMiddleware(), router)
}