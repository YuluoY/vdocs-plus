/**
 * @Author：雨落
 * @Dir：server/dao/CommentDao
 * @Time：2022/8/8 11:18:27
 */

const {query} = require("express");
module.exports = {
    /**
     * 添加一条评论
     * @param event 评论数据对象
     * @param subId 假如是回复那么就存在subId，反正是评论subId就是undefined
     * @param req
     * @returns {Promise<HydratedDocument<unknown, {}, {}>[]|Query<Document<unknown, any, unknown> & Require_id<unknown>, Document<unknown, any, unknown> & Require_id<unknown>, {}, unknown>>}
     */
    'addCommentDao': async (event, subId, req) => {
        if (subId) {
            // 获取上一级评论
            const parentComment = await req.Model.findById(subId)
            event.parentId = parentComment.parentId || parentComment._id.toString(); // 获取祖先id
            event.sub = subId;
            const {_id} = await req.Model.create(event); // 将祖先id和当前回复信息一并创建一个文档行
            // 将这个刚创建的文档行id，push到祖先文档行的sub字段中
            return req.Model.findByIdAndUpdate(event.parentId, {$push: {sub: _id.toString()}});
        }
        return await req.Model.create(event);
    },
    'getCommentsDao': async ({start, num, sort}, req) => {
        const queryOptions = {}
        if (sort) {
            queryOptions.sort = JSON.parse(sort);
        }
        return req.Model.find().setOptions(queryOptions).skip(start).limit(num);
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
        }
        return -1;
    },
    'getCommentNumDao': async (req) => {
        const res = await req.Model.find().count();
        return res;
    }
}