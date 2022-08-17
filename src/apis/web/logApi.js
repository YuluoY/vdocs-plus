import request from "@/axios";
import {LOG_BASE_URL} from "@/apis/web/global";

const BASE_URL = LOG_BASE_URL;

export async function getLogs() {
    return await request.bind(this)({
        url: BASE_URL + '/getLogs',
        method: 'get'
    })
}
