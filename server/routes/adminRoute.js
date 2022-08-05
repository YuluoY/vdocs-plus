
module.exports = app => {
    const inflectionMiddleware = require("../middleware/resource");
    const router = require('express').Router();


    require('./ArticleRoutes')(router)
    require('./CategoryRoutes')(router)
    require('./LogRoutes')(router)


    app.use('/api/admin/:resource', inflectionMiddleware(), router)
}