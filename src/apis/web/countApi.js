/**
 * @Author：雨落
 * @Dir：src/apis/web
 * @Time：2022/8/17 08:29:56
 */

import request from "@/axios";
import {COUNT_BASE_URL} from "@/apis/web/global";

export async function getAndUpdateCount(params) {
    return await request({
        url: COUNT_BASE_URL + '/getAndUpdateCount',
        method: 'post'
    }, params)
}