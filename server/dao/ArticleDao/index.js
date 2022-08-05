module.exports = {
    async getArticlesDao(req) {
        return req.Model.find().populate('categories').lean();
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