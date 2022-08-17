/**
 * @Author：雨落
 * @Dir：server/routes/Count
 * @Time：2022/8/17 07:55:57
 */
const countService = require('../../service/CountService/web')
module.exports = router => {
    router.post('/getAndUpdateCount', async (req, res) => {
        const result = await countService.getAndUpdateCountService(req.body, req);
        res.send(result)
    })
}