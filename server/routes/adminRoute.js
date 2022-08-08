module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();

    require('./ArticleRoutes/admin')(router)
    require('./CategoryRoutes/admin')(router)
    require('./CommentRoutes/admin')(router)
    require('./LogRoutes/admin')(router)

    app.use('/api/admin/:resource', inflectionMiddleware(), router)
}