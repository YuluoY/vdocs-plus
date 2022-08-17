/**
 * @Author：雨落
 * @Dir：server/service/CategoryService
 * @Time：2022/8/12 08:07:40
 */
const categoryDao = require('../../dao/CategoryDao/web')
module.exports = {
    getCategoriesService(event, req, res) {
        return categoryDao.getCategoriesDao(event, req)
    }
}