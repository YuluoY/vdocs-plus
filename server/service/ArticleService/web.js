/**
 * @Author：雨落
 * @Dir：server/service/ArticleService
 * @Time：2022/8/8 11:07:35
 */

const webDao = require("../../dao/webDao");
module.exports = {
    async getArticlesService(req, res) {
        return await webDao.getArticlesDao(req);
    },
}