/**
 * @Author：雨落
 * @Dir：server/service/LoginService
 * @Time：2022/8/8 11:06:39
 */

const webDao = require("../../dao/webDao");
module.exports = {
    async loginService(req, res) {
        return await webDao.loginDao(req,res);
    },
}