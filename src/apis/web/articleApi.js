import request from "@/axios";

const BASE_URL = '/web/article'

export async function getArticles() {
    return await request({
        url: BASE_URL + '/getArticles',
        method: 'get'
    })
}

export async function updateViewNum(params) {
    return await request({
        url: BASE_URL + '/updateViewNum',
        method: 'patch'
    }, params)
}

export async function getArticleNum() {
    return await request({
        url: BASE_URL + '/getArticleNum',
        method: 'get'
    })
}