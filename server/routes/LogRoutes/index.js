const adminService = require("../../service/adminService");
module.exports = router => {
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
}