/**
 * @Author：雨落
 * @Dir：server/dao/CommentDao
 * @Time：2022/8/8 11:18:27
 */

module.exports = {
    'addCommentDao': async (event, subId, req) => {
        if (subId) {
            // 获取上一级评论
            const parentComment = await req.Model.findById(subId)
            const ancestryId = parentComment.parentId || parentComment._id.toString(); // 获取祖先id
            event.parentId = ancestryId;
            event.sub = subId;
            const {_id} = await req.Model.create(event); // 将祖先id和当前回复信息一并创建一个文档行
            // 将这个刚创建的文档行id，push到祖先文档行的sub字段中
            return req.Model.findByIdAndUpdate(ancestryId, {$push: {sub: _id.toString()}});
        }
        return await req.Model.create(event);
    },

    'getCommentsByPathDao': async (event, req) => {
        event.isSub = false;
        return req.Model.find(event).populate('sub')
    },
    'updateLikeByIdDao': async ({_id, field, userInfo}, req) => {
        const selfInc = field === 'like' ? {like: 1} : {dislike: 1}
        const comment = await req.Model.findById(_id, {'userInfo.cip': userInfo.cip})
        if (comment.userInfo.length === 0) {
            return req.Model.updateOne({_id}, {$push: {userInfo}, $inc: selfInc})
        } else {
            return -1;
        }
    },
    'getCommentNumDao': async (req) => {
        const res = await req.Model.find().count();
        return res;
    }
}