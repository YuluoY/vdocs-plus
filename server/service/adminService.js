const adminDao = require('../dao/adminDao')

module.exports = {
    addArticleService(event, req, res) {
        return adminDao.addArticleDao(event, req)
    },

    addCategoryService(event, req, res) {
        return adminDao.addCategoryDao(event, req)
    },

    getAllCategoryService(req, res) {
        return adminDao.getAllCategoryDao(req)
    },

    delCategoryService(event, req) {
        return adminDao.delCategoryDao(event, req);
    },
    updateCategoryService(event, req) {
        return adminDao.updateCategoryDao(event, req);
    },


    // log
    addLogService(event, req, res) {
        return adminDao.addLogDao(event, req);
    },
    getLogsService(req, res) {
        return adminDao.getLogsDao(req)
    },

    delLogService(event, req) {
        return adminDao.delLogDao(event, req);
    },
    updateLogService(event, req) {
        return adminDao.updateLogDao(event, req);
    }
}