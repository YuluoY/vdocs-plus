/**
 * @Author：雨落
 * @Dir：server/routes/CommentRoutes
 * @Time：2022/8/8 11:12:28
 */

const webService = require("../../service/webService");
const http = require("http");
module.exports = router => {
    // 添加评论
    router.post('/addComment', async (req, res) => {
        const result = await webService.addCommentService(req.body, req, res);
        res.send(result);
    })

    router.get('/getCommentsByPath', async (req, res) => {
        const result = await webService.getCommentsByPathService(req.query, req, res);
        res.send(result);
    })

    // 获取用户的ip
    router.get('/getUserIp', async (req, res) => {
        const http = require('http');
        http.get('http://pv.sohu.com/cityjson?ie=utf-8', request => {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            });

            request.on('end', () => {
                res.send(/\{.*\}/.exec(data)[0])
            })
        })
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