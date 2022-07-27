module.exports = {
    async loginDao(req, res) {
        const result = await req.Model.findOne(req.query);
        return result;
    }
}