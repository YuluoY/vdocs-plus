module.exports = {
    async addArticleDao(event, req) {
        return await req.Model.create(event);
    }
}