const http = require("http");
module.exports = app => {
    const router = require('express').Router();
    const restService = require('../service/restService');
    const inflectionMiddleware = require('../middleware/resource');


    /* region 使用multer将上传的图片存入本地，并返回图片访问地址 */
    // 在服务器目录的upload文件夹下新建admin文件夹并存入。路径：/upload/admin/xx.jpg
    const multerMiddleware = require('../middleware/multer')({dirname: '/'});
    router.post('/upload', multerMiddleware.single('file'), async (req, res) => {
        let file = req.file;
        const BASE_URL_API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' :
            process.env.NODE_ENV === 'production' ? 'https://www.hyl.wiki' : 'http://localhost:3000';
        file.url = BASE_URL_API + `/upload/${file.filename}`
        res.send(file);
    })
    /* endregion */

    // 获取用户的ip
    router.get('/getUserIp', async (req, res) => {
        const http = require('http');
        http.get('http://pv.sohu.com/cityjson?ie=utf-8', request => {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            });
            request.on('end', () => {
                res.send(/\{.*\}/.exec(data)[0])
            })
        })
    })

    app.use('/api/rest', router)
}