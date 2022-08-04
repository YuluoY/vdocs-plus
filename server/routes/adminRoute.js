const {myAssert} = require("../utils");
const adminService = require("../service/adminService");
module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();
    const adminService = require('../service/adminService');


    // 添加文章
    router.post('/addArticle', async (req, res) => {
        const result = await adminService.addArticleService(req.body, req, res);
        myAssert(result, 401, '服务错误，文章添加失败', res);
        // res.send(result);
    })


    // 添加类别
    router.post('/addCategory', async (req, res) => {
        const result = await adminService.addCategoryService(req.body, req, res);
        res.send(result);
    })
    // 获取所有类别
    router.get('/getAllCategory', async (req, res) => {
        const result = await adminService.getAllCategoryService(req, res);
        res.send(result);
    })
    // 根据Id删除类别
    router.delete('/delCategory', async (req, res) => {
        const {_id} = req.query;
        const result = await adminService.delCategoryService({_id}, req, res);
        res.send(result);
    })
    // 根据Id修改类别
    router.patch('/updateCategory', async (req, res) => {
        const result = await adminService.updateCategoryService(req.body, req, res);
        res.send(result);
    })

    // 添加日志
    router.post('/addLog', async (req, res) => {
        const result = await adminService.addLogService(req.body, req, res);
        res.send(result);
    })
    // 获取所有日志
    router.get('/getLogs', async (req, res) => {
        const result = await adminService.getLogsService(req, res);
        res.send(result);
    })
    // 根据Id删除日志
    router.delete('/delLog', async (req, res) => {
        const {_id} = req.query;

        const result = await adminService.delLogService({_id}, req, res);
        res.send(result);
    })
    // 根据Id修改日志
    router.patch('/updateLog', async (req, res) => {

        const result = await adminService.updateLogService(req.body, req, res);
        res.send(result);
    })

    app.use('/api/admin/:resource', inflectionMiddleware(), router)
}