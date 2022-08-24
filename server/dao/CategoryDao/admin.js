module.exports = {
    async addCategoryDao(event, req) {
        return await req.Model.create(event);
    },

    async getAllCategoryDao(req) {
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
                    foreignField: '_id',
                    localField: 'parent',
                    as: 'parentCates'
                }
            }
        ]);
    },

    async delCategoryDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateCategoryDao(event, req) {
        return req.Model.updateOne({_id: event._id}, {cateName: event.cateName, parent: event.parent});
    },
}