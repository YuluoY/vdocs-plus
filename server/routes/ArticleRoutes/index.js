const adminService = require("../../service/adminService");
const {myAssert} = require("../../utils");
module.exports = router => {
    const articleService = require('../../service/ArticleService')

    // 添加文章
    router.post('/addArticle', async (req, res) => {
        const result = await adminService.addArticleService(req.body, req, res);
        myAssert(result, 401, '服务错误，文章添加失败', res);
        // res.send(result);
    })

    router.get('/getArticles', async (req, res) => {
        const result = await articleService.getArticlesService(req, res);
        res.send(result);
    })

    router.delete('/delArticle', async (req, res) => {
        const _id = req.query['0'];
        const result = await articleService.delArticleService(_id, req, res)
        res.send(result)
    })

    router.put('/updateArticle', async (req, res) => {
        const result = await articleService.updateArticleService(req.body, req, res)
        res.send(result)
    })
}