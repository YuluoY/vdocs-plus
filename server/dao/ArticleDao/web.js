/**
 * @Author：雨落
 * @Dir：server/dao/ArticleDao
 * @Time：2022/8/8 11:09:38
 */

module.exports = {
    async getArticlesDao(req) {
        const result = await req.Model.aggregate([
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
        return result;
    },
    async getArticleByIdDao(event, req) {
        const res = await req.Model.findOne(event);
        return res;
    },

    async updateViewNumDao(event, req) {
        const result = await req.Model.findByIdAndUpdate(event, {$inc: {viewNum: 1}})
        return result;
    },

    async getArticleNumDao(req) {
        const res = await req.Model.find().count();
        return res;
    }
}