/**
 * @Author：雨落
 * @Dir：server/dao/CommentDao
 * @Time：2022/8/8 11:18:27
 */

module.exports = {
    'addCommentDao': async (event, req) => {
        return await req.Model.create(event);
    },

    'getCommentsByPathDao': async (event, req) => {
        return req.Model.find(event);
    },
    'updateLikeByIdDao': async ({_id, field, userInfo}, req) => {
        const selfInc = field === 'like' ? {like: 1} : {dislike: 1}
        const comment = await req.Model.findById(_id, {'userInfo.cip': userInfo.cip})
        if (comment.userInfo.length === 0) {
            return req.Model.updateOne({_id}, {$push: {userInfo}, $inc: selfInc})
        } else {
            return -1;
        }

    }
}