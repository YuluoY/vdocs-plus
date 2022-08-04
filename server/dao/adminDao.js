module.exports = {
    async addArticleDao(event, req) {
        return await req.Model.create(event);
    },

    async addCategoryDao(event, req) {
        return await req.Model.create(event);
    },

    async getAllCategoryDao(req) {
        if (req.Model.modelName === 'Category') {
            return req.Model.find().populate('parent').lean();
        }
    },

    async delCategoryDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateCategoryDao(event, req) {
        return req.Model.updateOne({_id: event._id}, {cateName: event.cateName, parent: event.parent});
    },


    // log
    async addLogDao(event, req) {
        return await req.Model.create(event);
    },

    async getLogsDao(req) {
        return req.Model.find().lean();
    },

    async delLogDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateLogDao(event, req) {
        const {_id} = event;
        delete event._id
        return req.Model.updateOne({_id}, event);
    }
}