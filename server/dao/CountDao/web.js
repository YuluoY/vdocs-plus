/**
 * @Author：雨落
 * @Dir：server/dao/CountDao
 * @Time：2022/8/17 08:24:18
 */

module.exports = {
    async getAndUpdateCountDao({visitorInfo}, req) {
        let res = null;
        const isCreate = await req.Model.exists({sign: '1'})
        if (isCreate) {
            let updateOptions = {
                $push: {},
                $inc: {visitNum: 1}
            }
            const isUser = await req.Model.exists({'visitors.cip': visitorInfo.cip})
            if (!isUser) {
                updateOptions.$inc.visitorNum = 1;
                updateOptions.$push.visitors = visitorInfo;
            }
            res = await req.Model.findOneAndUpdate({sign: '1'}, updateOptions, {new: true})
        } else {
            res = await req.Model.create({
                sign: '1',
                visitorNum: 1,
                visitNum: 1,
                visitors: [visitorInfo]
            })
        }
        return res;
    }
}