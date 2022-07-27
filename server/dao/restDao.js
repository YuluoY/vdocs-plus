module.exports = {
    async defaultDao(req, res) {
        const result = await req.Model.find()
        return result;
    }
}