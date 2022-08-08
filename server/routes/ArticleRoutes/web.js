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
}