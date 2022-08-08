/**
 * @Author：雨落
 * @Dir：server/dao/LogDao
 * @Time：2022/8/8 11:10:23
 */

module.exports = {
    async getLogsDao(req) {
        const result = await req.Model.find().lean();
        return result;
    }
}