/**
 * @Author：雨落
 * @Dir：server/routes/LogRoutes
 * @Time：2022/8/8 11:05:27
 */

const webService = require("../../service/webService");
const {myAssert} = require("../../utils");

module.exports = router => {
    router.get('/getLogs', async (req, res) => {
        const result = await webService.getLogsService(req, res);
        myAssert(result, 401, '日志获取失败！', res);
    })
}