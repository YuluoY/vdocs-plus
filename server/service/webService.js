const webDao = require('../dao/webDao');

module.exports = {
    async loginService(req, res) {
        return await webDao.loginDao(req,res);
    },

    async getArticlesService(req,res){
        return await webDao.getArticlesDao(req);
    },

    async getLogsService(req,res){
        return await webDao.getLogsDao(req);
    },
}