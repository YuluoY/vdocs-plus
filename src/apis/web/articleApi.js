import request from "@/axios";

const BASE_URL = '/web/article'

export async function getArticles() {
    return await request({
        url: BASE_URL + '/getArticles',
        method: 'get'
    })
}
