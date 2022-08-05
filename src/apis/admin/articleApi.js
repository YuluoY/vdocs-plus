import request from "@/axios";

const BASE_URL = '/admin/article'

export async function addArticle(params) {
    return await request({
        url: BASE_URL + '/addArticle',
        method: 'post',
    }, params)
}

export async function getArticles() {
    return await request({
        url: BASE_URL + '/getArticles',
        method: 'get'
    })
}

export async function delArticle(id) {
    return await request({
        url: BASE_URL + '/delArticle',
        method: 'delete'
    }, id)
}

export async function updateArticle(params) {
    return await request({
        url: BASE_URL + '/updateArticle',
        method: 'put' // 要求提供一个完整的对象
    }, params)
}