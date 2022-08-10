/**
 * @Author：雨落
 * @Dir：server/routes/ArticleRoutes
 * @Time：2022/8/8 11:04:25
 */

const webService = require("../../service/webService");
const {myAssert} = require("../../utils");
module.exports = router => {
    router.get('/getArticles', async (req, res) => {
        const result = await webService.getArticlesService(req, res);
        myAssert(result, 401, '文章获取失败！', res);
    })

    router.get('/getArticleById/:_id', async (req, res) => {
        const result = await webService.getArticleByIdService(req.params, req, res);
        res.send(result)
    })

    router.get('/getArticleNum', async (req, res) => {
        const result = await webService.getArticleNumService(req, res);
        res.send(result.toString())
    })

    router.patch('/updateViewNum', async (req, res) => {
        const result = await webService.updateViewNumService(req.body, req, res);
        res.send(result)
    })
}