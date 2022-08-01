module.exports = app => {
    const router = require('express').Router();
    const restService = require('../service/restService');
    const inflectionMiddleware = require('../middleware/resource');


    /* region 使用multer将上传的图片存入本地，并返回图片访问地址 */
    // 在服务器目录的upload文件夹下新建admin文件夹并存入。路径：/upload/admin/xx.jpg
    const multerMiddleware = require('../middleware/multer')({dirname:'/'});
    router.post('/upload', multerMiddleware.single('file'), async (req, res) => {
        let file = req.file;
        file.url = `http://localhost:3000/upload/${file.filename}`
        res.send(file);
    })
    /* endregion */

    app.use('/api/rest', router)
}