/**
 * @Author：雨落
 * @Dir：server/dao/CommentDao
 * @Time：2022/8/8 11:18:27
 */

module.exports = {
    'addCommentDao': async (event, sub, req) => {
        const {_id} = await req.Model.create(event)
        if (sub) {
            return req.Model.findByIdAndUpdate(sub, {$push: {sub: _id}});
        }
        return _id;
    },

    'getCommentsByPathDao': async (event, req) => {
        event.isSub = false;
        return req.Model.find(event).populate(
            {path: 'sub', populate: {path: 'sub',populate: {path: 'sub',populate: {path: 'sub',
                            populate: {path: 'sub',populate: {path: 'sub',populate: {path: 'sub'}}}}}}});
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