module.exports = {
    ...require('./ArticleDao/web'),
    ...require('./CommentDao/web'),
    ...require('./LoginDao/web'),
    ...require('./LogDao/web')
}