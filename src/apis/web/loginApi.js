import request from "@/axios";

export async function loginApi(params) {
    return await request({
        method: 'get',
        url: '/web/user/login',
    }, params)
}