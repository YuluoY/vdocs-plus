/**
 * @Author：雨落
 * @Dir：src/apis/admin
 * @Time：2022/8/15 01:39:42
 */

import request from "@/axios";

const BASE_URL = '/admin/comment'

export async function getComments() {
    return await request({
        url: BASE_URL + '/getComments',
        method: 'get'
    })
}

export async function getCommentByPath(params) {
    return await request({
        url: BASE_URL + '/getCommentByPath',
        method: 'get'
    }, params)
}

export async function delCommentById(params) {
    return await request({
        url: BASE_URL + '/delCommentById',
        method: 'delete'
    }, params)
}

export async function updateCommentById(params) {
    return request({
        url: BASE_URL + '/updateCommentById',
        method: 'patch'
    }, params)
}