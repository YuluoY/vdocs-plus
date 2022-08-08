const adminDao = require("../../dao/adminDao");
module.exports = {
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