// 日期格式化
const dayjs = require('dayjs')
const https = require("https");


module.exports = {
    formatDate(time, format = "YYYY年MM月DD日 HH:mm:ss") {
        return dayjs(time).format(format);
    },

    myAssert(value, status, message, res) {
        const assert = require('assert');
        try {
            assert(value, message);
            res.send(value)
        } catch (e) {
            res.status(status).send(e.message)
        }
    },

    createMkdir(path) {
        const fs = require('fs')
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    },

    isDevelopment() {
        return process.env.NODE_ENV === 'development'
    },


    getUserIP(url) {
        return new Promise((resolve, reject) => {
            const https = require('https');
            let data = '';
            try {
                https.get(url, req => {
                    req.on('data', chunk => data += chunk)
                    req.on('end', () => {
                        const userInfo = JSON.parse(/\{.*\}/.exec(data)[0]);
                        resolve(userInfo)
                    })
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getUrl(req) {
        let url = '';
        if (process.env.NODE_ENV === 'development') {
            url = 'https://pv.sohu.com/cityjson?ie=utf-8';
        } else {
            const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            const key = '8c39ec3154c6d002247c6dbe0d28a6cd' // 高德
            const api = 'https://restapi.amap.com/v3/ip'
            url = `${api}?ip=${ip}&key=${key}`
        }
        return url;
    }

}