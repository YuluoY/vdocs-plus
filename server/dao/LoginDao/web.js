/**
 * @Author：雨落
 * @Dir：server/dao/LoginDao
 * @Time：2022/8/8 11:08:43
 */

module.exports = {
    async loginDao(req, res) {
        const result = await req.Model.findOne(req.query);
        return result;
    },
}