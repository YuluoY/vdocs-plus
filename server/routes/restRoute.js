const {getUserIP} = require("../utils");
module.exports = app => {
    const router = require('express').Router();
    const restService = require('../service/restService');
    const inflectionMiddleware = require('../middleware/resource');


    /* region 使用multer将上传的图片存入本地，并返回图片访问地址 */
    // 在服务器目录的upload文件夹下新建admin文件夹并存入。路径：/upload/admin/xx.jpg
    // const multerMiddleware = require('../middleware/multer')({dirname: '/'});
    // router.post('/upload', multerMiddleware.single('file'), async (req, res) => {
    //     let file = req.file;
    //     const BASE_URL_API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' :
    //         process.env.NODE_ENV === 'production' ? 'https://www.hyl.wiki' : 'http://localhost:3000';
    //     file.url = BASE_URL_API + `/upload/${file.filename}`
    //     res.send(file);
    // })
    /* endregion */
    router.post('/upload', require('../middleware/multer')().single('file'), async (req, res) => {
        const aliOss = require('../utils/aliOss');
        let options = {
            region: 'oss-cn-hangzhou',
            accessKeyId: 'LTAI5tGDw1hSPPFvd2eGc6Vf',
            accessKeySecret: 'ZTmRVyWXiFRzdcOvU2CfXBfVXsPYtQ',
            bucket: 'vdocs'
        }
        const up = new aliOss(options)
        const result = await up.putImg(null, `images/${req.file.filename}`, req.file.path)
        res.send(result)
    })

    // 获取用户的ip
    router.get('/getUserIp', async (req, res) => {
        const {isDevelopment, getUserIP, getUrl} = require("../utils");

        const url = getUrl(req);
        const info = await getUserIP(url);
        if(!isDevelopment()){
            const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            info.ip = ip;
        }
        res.send(info)
    })

    app.use('/api/rest', router)
}