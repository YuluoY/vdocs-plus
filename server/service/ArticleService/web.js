/**
 * @Author：雨落
 * @Dir：server/service/ArticleService
 * @Time：2022/8/8 11:07:35
 */

const webDao = require("../../dao/webDao");
module.exports = {
    async getArticlesService({start, num, sort}, req) {
        return await webDao.getArticlesDao({start, num, sort}, req);
    },

    getArticleByIdService(event, req) {
        return webDao.getArticleByIdDao(event, req);
    },

    updateViewNumService(event, req) {
        return webDao.updateViewNumDao(event, req);
    },

    getArticleNumService(req) {
        return webDao.getArticleNumDao(req);
    }
}