/**
 * @Author：雨落
 * @Dir：server/routes/CategoryRoutes
 * @Time：2022/8/12 08:06:03
 */
const categoryService = require('../../service/CategoryService/web')
module.exports = router => {
    router.get('/getCategories', async (req, res) => {
        const result = await categoryService.getCategoriesService(req.query, req, res);
        res.send(result)
    })
}