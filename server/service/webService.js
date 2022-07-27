const webDao = require('../dao/webDao');

module.exports = {
    async loginService(req, res) {
        return await webDao.loginDao(req,res);
    }
}