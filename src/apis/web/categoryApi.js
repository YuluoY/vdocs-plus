/**
 * @Author：雨落
 * @Dir：src/apis/web
 * @Time：2022/8/12 08:19:22
 */
import request from "@/axios";
import {CATEGORY_BASE_URL} from "@/apis/web/global";

const BASE_URL = CATEGORY_BASE_URL;

export async function getCategories(params) {
    return await request({
        url: BASE_URL + '/getCategories',
        method: 'get'
    }, params)
}