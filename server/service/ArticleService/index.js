const adminDao = require('../../dao/adminDao');

module.exports = {
    async getArticlesService(req, res) {
        return adminDao.getArticlesDao(req)
    },

    async delArticleService(event, req, res) {
        return adminDao.delArticleDao(event, req);
    },

    async updateArticleService(event, req, res){
        return adminDao.updateArticleDao(event, req);
    },

    addArticleService(event, req, res) {
        return adminDao.addArticleDao(event, req)
    },
}