/**
 * @Author：雨落
 * @Dir：server/service/CommentService
 * @Time：2022/8/8 10:22:40
 */
const adminDao = require("../../dao/adminDao");

module.exports = {
    addCommentService(event, req, res) {
        return adminDao.addCommentDao(event, req)
    },

    getCommentsService(req, res) {
        return adminDao.getCommentsDao(req)
    },
    getCommentByPathService(event, req, res) {
        return adminDao.getCommentByPathDao(event, req);
    },

    delCommentByIdService(event, req) {
        return adminDao.delCommentByIdDao(event, req);
    },

    updateCommentByIdService(event, req) {
        return adminDao.updateCommentByIdDao(event, req);
    },

}