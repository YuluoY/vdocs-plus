/**
 * @Author：雨落
 * @Dir：src/apis/rest
 * @Time：2022/8/15 18:52:11
 */

import request from "@/axios";

const BASE_URL = '/rest'

export async function getUserIp() {
    return await request({
        url: BASE_URL + '/getUserIp',
        method: 'get'
    })
}