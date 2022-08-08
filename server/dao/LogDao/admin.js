module.exports = {
    // log
    async addLogDao(event, req) {
        return await req.Model.create(event);
    },

    async getLogsDao(req) {
        return req.Model.find().lean();
    },

    async delLogDao(event, req) {
        return req.Model.deleteOne(event);
    },
    async updateLogDao(event, req) {
        const {_id} = event;
        delete event._id
        return req.Model.updateOne({_id}, event);
    }
}