/**
 * @Author：雨落
 * @Dir：src/apis/web
 * @Time：2022/8/8 11:19:51
 */

import request from "@/axios";
import {COMMENT_BASE_URL} from "@/apis/web/global";

const BASE_URL = COMMENT_BASE_URL

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

export async function getComments(params) {
    return await request({
        url: BASE_URL + '/getComments',
        method: 'get',
    }, params)
}

export async function getCommentsByPath(params) {
    return await request({
        url: BASE_URL + '/getCommentsByPath',
        method: 'get'
    }, params)
}



export async function updateLike(params) {
    return await request({
        url: BASE_URL + '/updateLikeById',
        method: 'patch'
    }, params)
}
