const db = require('mongoose');

const schema = new db.Schema({
    cateName: {type: String, required: true},
    parent: [{
        // mongoose.Schema.Types.ObjectId
        type: db.SchemaTypes.ObjectId,
        ref: "Category", // 与该文档id关联，即：可以获取分类的id
        default: []
    }]
});
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

// schema.virtual("category", {
//     localField: "_id",
//     foreignField: "cateName",
//     justOne: false,
//     ref: "Article",
// });

module.exports = db.model('Category', schema, 'category');