import request from "@/axios";
import {LOGIN_BASE_URL} from "@/apis/web/global";

export async function loginApi(params) {
    return await request({
        method: 'get',
        url: LOGIN_BASE_URL + '/login',
    }, params)
}
