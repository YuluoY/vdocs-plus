module.exports = {
    async loginDao(req, res) {
        const result = await req.Model.findOne(req.query);
        return result;
    },

    async getArticlesDao(req){
        const result = await req.Model.find().populate('categories').lean();
        return result;
    },

    async getLogsDao(req){
        const result = await req.Model.find().lean();
        return result;
    }
}