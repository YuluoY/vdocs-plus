/**
 * @Author：雨落
 * @Dir：server/routes/CommentRoutes
 * @Time：2022/8/8 10:15:31
 */
const adminService = require("../../service/adminService");

module.exports = router => {
    // 添加评论
    router.post('/addComment', async (req, res) => {
        const result = await adminService.addCommentService(req.body, req, res);
        res.send(result);
    })

    // 获取所有评论
    router.get('/getComments', async (req, res) => {
        const result = await adminService.getCommentsService(req, res);
        res.send(result);
    })
    // 根据页面路由路径获取评论
    router.get('/getCommentByPath', async (req, res) => {
        console.log(req.query)
        const result = await adminService.getCommentByPathService(req, res);
        res.send('1')
    })
    // 根据Id删除评论
    router.delete('/delCommentById', async (req, res) => {
        const {_id} = req.query;
        const result = await adminService.delCommentByIdService({_id}, req, res);
        res.send(result);
    })
    // 根据Id修改评论
    router.patch('/updateCommentById', async (req, res) => {
        const result = await adminService.updateCommentByIdService(req.body, req, res);
        res.send(result);
    })
}