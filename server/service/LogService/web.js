/**
 * @Author：雨落
 * @Dir：server/service/LogService
 * @Time：2022/8/8 11:07:59
 */

const webDao = require("../../dao/webDao");
module.exports = {
    async getLogsService(req, res) {
        return await webDao.getLogsDao(req);
    },
}