module.exports = {
    async getArticlesDao(req) {
        return req.Model.aggregate([
            {
                $lookup: {
                    from: 'comment',  // 关联article表
                    foreignField: 'path', // 外部字段，即：article表中的cate字段
                    localField: 'path', // 本地字段，即：category表中的name字段
                    as: 'comments', // 当本地字段与外部字段中的值相等时，就将article表中的这一行数据添加在category_items字段中。
                },
            },
            {
                $lookup: {
                    from: 'category',  // 关联article表
                    foreignField: '_id', // 外部字段，即：article表中的cate字段
                    localField: 'categories', // 本地字段，即：category表中的name字段
                    as: 'cates', // 当本地字段与外部字段中的值相等时，就将article表中的这一行数据添加在category_items字段中。
                },
            }
        ])
    },

    async delArticleDao(_id, req) {
        return req.Model.deleteOne({_id});
    },

    async updateArticleDao(event, req) {
        const {_id} = event;
        delete event._id;
        return req.Model.updateOne({_id}, event);
    },

    async addArticleDao(event, req) {
        return await req.Model.create(event);
    },
}