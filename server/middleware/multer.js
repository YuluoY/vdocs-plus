module.exports = options => {
    const multer = require('multer');
    const p = require('path');

    const storage = multer.diskStorage({
        // async destination(req, file, cb) {
        //     cb(null, p.join(__dirname, `/../upload/${options.dirname}`))
        // },
        filename(req, file, cb) {
            let fileArr = file.originalname.split('.');
            // cb(null, fileArr[0] + '-' + Date.now() + `.${fileArr[fileArr.length - 1]}`)
            cb(null, fileArr[0] + `.${fileArr[fileArr.length - 1]}`)
        }
    });
    return multer({storage});
}