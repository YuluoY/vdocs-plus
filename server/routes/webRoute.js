
module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();

    require('./ArticleRoutes/web')(router)
    require('./CategoryRoutes/web')(router)
    require('./CommentRoutes/web')(router)
    require('./CountRoutes/web')(router)
    require('./LoginRoutes/web')(router)
    require('./LogRoutes/web')(router)

    app.use('/api/web/:resource', inflectionMiddleware(), router)
}