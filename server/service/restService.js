const restDao = require('../dao/restDao')

module.exports = {
    async defaultService(req, res) {
        return await restDao.defaultDao(req, res)
    }
}