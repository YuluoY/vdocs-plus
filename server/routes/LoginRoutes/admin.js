/**
 * @Author：雨落
 * @Dir：server/routes/LoginRoutes
 * @Time：2022/8/14 04:34:10
 */

module.exports = router => {
    router.get('/getUsers', async (req, res) => {
        res.send(await req.Model.find().lean())
    })
}