// 日期格式化
const dayjs = require('dayjs')

module.exports = {
    formatDate(time, format = "YYYY年MM月DD日 HH:mm:ss") {
        return dayjs(time).format(format);
    },

    myAssert(value, status, message, res) {
        const assert = require('assert');
        try {
            assert(value, message);
            res.send(value)
        }catch (e){
            res.status(status).send(e.message)
        }
    },

    createMkdir(path){
        const fs = require('fs')
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
    }
}