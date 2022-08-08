const adminService = require("../../service/adminService");

module.exports = router => {
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
}