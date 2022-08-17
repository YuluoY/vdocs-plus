import request from "@/axios";
import {ARTICLE_BASE_URL} from "@/apis/web/global";

const BASE_URL = ARTICLE_BASE_URL

export async function getArticles(params) {
    return await request({
        url: BASE_URL + '/getArticles',
        method: 'get'
    }, params)
}

export async function getArticleById(id) {
    return await request({
        url: BASE_URL + '/getArticleById/' + id,
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