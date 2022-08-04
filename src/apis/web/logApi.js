import request from "@/axios";

const BASE_URL = '/web/log'

export async function getLogs() {
    return await request.bind(this)({
        url: BASE_URL + '/getLogs',
        method: 'get'
    })
}
