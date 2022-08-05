const adminDao = require("../../dao/adminDao");
module.exports = {
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
}