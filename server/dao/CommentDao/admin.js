/**
 * @Author：雨落
 * @Dir：server/dao/CommentDao
 * @Time：2022/8/8 10:26:01
 */
module.exports = {
    async addCommentDao(event, req) {
        return await req.Model.create(event);
    },

    async getCommentsDao(req) {
        if (req.Model.modelName === 'Comment') {
            return req.Model.find().populate('parent').lean();
        }
    },

    async getCommentByPathDao(even, req){
        return req.Model.findOne(even);
    },

    async delCommentByIdDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateCommentByIdDao(_id, event, req) {
        return req.Model.updateOne({_id}, event);
    },
}