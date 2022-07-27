const db = require('mongoose');

const schema = new db.Schema({
    imgUrl: {type: String},  // 图片
    title: {type: String, required: true}, // 文章标题
    content: {type: String, required: true}, // 文章内容
    author: {type: String, require: true}, // 文章作者
    categories: [{type: db.SchemaTypes.ObjectId, ref: 'Category'}], // 文章类别
    desc: {type: String, default: '这个作者很吊，未留下描述内容！'}, // 文章描述
    updateDate: {type: Date, default: Date.now}, // 更新时间
    releaseDate: {type: Date, default: Date.now}, // 发布时间
    viewsNum: {type: Number, default: 1}, // 文章浏览次数
    commentNum: {type: Number, default: 0}, // 评论数
});

module.exports = db.model('Article', schema, 'article');