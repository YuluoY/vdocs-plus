/**
 * @Author：雨落
 * @Dir：src/apis/web
 * @Time：2022/8/8 11:19:51
 */

import request from "@/axios";

const BASE_URL = '/web/comment'

export async function addComment(params) {
    return await request({
        url: BASE_URL + '/addComment',
        method: 'post'
    }, params)
}

export async function getAllComment() {
    return await request({
        url: BASE_URL + '/getAllComment',
        method: 'get'
    })
}

export async function getCommentNum() {
    return await request({
        url: BASE_URL + '/getCommentNum',
        method: 'get'
    })
}

export async function getCommentsByPath(params) {
    return await request({
        url: BASE_URL + '/getCommentsByPath',
        method: 'get'
    }, params)
}

export async function getUserIp() {
    return await request({
        url: BASE_URL + '/getUserIp',
        method: 'get'
    })
}

export async function updateLike(params) {
    return await request({
        url: BASE_URL + '/updateLikeById',
        method: 'patch'
    }, params)
}
