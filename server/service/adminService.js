const adminDao = require('../dao/adminDao')

module.exports = {
    addArticleService(event, req, res) {
        return adminDao.addArticleDao(event, req)
    }
}