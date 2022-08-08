/**
 * @Author：雨落
 * @Dir：server/dao/ArticleDao
 * @Time：2022/8/8 11:09:38
 */

module.exports = {
    async getArticlesDao(req){
        const result = await req.Model.find().populate('categories').lean();
        return result;
    },
}