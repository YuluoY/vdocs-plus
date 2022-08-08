/**
 * @Author：雨落
 * @Dir：server/service/CommentService
 * @Time：2022/8/8 11:16:02
 */


const webDao = require("../../dao/webDao");
module.exports = {
    'addCommentService': async (event, req, res) => {
        return webDao.addCommentDao(event, req);
    },
    'getCommentsByPathService': async (event, req, res) => {
        return webDao.getCommentsByPathDao(event, req);
    },

    'updateLikeByIdService': async (event, req, res) => {
        return webDao.updateLikeByIdDao(event, req);
    }
}