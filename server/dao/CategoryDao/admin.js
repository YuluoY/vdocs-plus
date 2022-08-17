module.exports = {
    async addCategoryDao(event, req) {
        return await req.Model.create(event);
    },

    async getAllCategoryDao(req) {
        if (req.Model.modelName === 'Category') {
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

            // return req.Model.find().populate('parent').lean();
        }
    },

    async delCategoryDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateCategoryDao(event, req) {
        return req.Model.updateOne({_id: event._id}, {cateName: event.cateName, parent: event.parent});
    },
}