/**
 * @Author：雨落
 * @Dir：server/routes/LoginRoutes
 * @Time：2022/8/8 11:02:42
 */

const webService = require("../../service/webService");
const {myAssert} = require("../../utils");
module.exports = router => {
    router.get('/login', async (req, res) => {
        const result = await webService.loginService(req, res);
        myAssert(result, 400, '身份错误！', res);
    })
}