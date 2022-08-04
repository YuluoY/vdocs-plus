import request from "@/axios";

const BASE_URL = '/admin/category'

export async function addCategory(params) {
    return await request({
        url: BASE_URL + '/addCategory',
        method: 'post',
    }, params)
}

export async function getAllCategory(bind) {
    return await request.bind(this)({
        url: BASE_URL + '/getAllCategory',
        method: 'get'
    }, {}, bind)
}

export async function delCategory(id) {
    return await request({
        url: BASE_URL + '/delCategory',
        method: 'delete',
    }, id)
}

export async function updateCategory(params) {
    return await request({
        url: BASE_URL + '/updateCategory',
        method: 'patch',
    }, params)
}