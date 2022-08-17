/**
 * @Author：雨落
 * @Dir：server/service/CountService
 * @Time：2022/8/17 08:19:55
 */

const countDao = require('../../dao/CountDao/web')
module.exports = {
    getAndUpdateCountService(event, req) {
        return countDao.getAndUpdateCountDao(event, req);
    }
}