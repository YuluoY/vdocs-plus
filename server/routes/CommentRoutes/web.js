/**
 * @Author：雨落
 * @Dir：server/routes/CommentRoutes
 * @Time：2022/8/8 11:12:28
 */

const webService = require("../../service/webService");
module.exports = router => {
    // 添加评论
    router.post('/addComment', async (req, res) => {
        const {sub} = req.body;
        sub && delete req.body.sub;
        const result = await webService.addCommentService(req.body, sub, req, res);
        res.send(result);
    })

    router.get('/getCommentsByPath', async (req, res) => {
        const result = await webService.getCommentsByPathService(req.query, req, res);
        res.send(result);
    })

    router.get('/getCommentNum', async (req, res) => {
        const result = await webService.getCommentNumService(req, res);
        res.send(result.toString())
    })

    router.get('/getComments', async (req, res) => {
        const {start, num, sort} = req.query;
        const result = await webService.getCommentsService({start, num, sort}, req);
        res.send(result)
    })


    router.patch('/updateLikeById', async (req, res) => {
        const result = await webService.updateLikeByIdService(req.body, req, res);
        if (result < 0) {
            res.status(405).send('请勿重复点赞！');
        } else {
            res.send(result);
        }
    })
}