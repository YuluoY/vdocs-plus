/**
 * @Author：雨落
 * @Dir：server/dao/CategoryDao
 * @Time：2022/8/12 08:14:00
 */

module.exports = {
    async getCategoriesDao({isArticle}, req) {
        if (isArticle) {
            return req.Model.aggregate([
                {
                    $lookup: {
                        from: 'article',
                        foreignField: 'categories',
                        localField: '_id',
                        as: 'articles'
                    },
                },
                {
                    $lookup: {
                        from: 'category',
                        foreignField: 'parent',
                        localField: '_id',
                        as: 'parentCates'
                    }
                }
            ]);
        } else {
            return req.Model.find().populate('parent').lean()
        }
    }
}