import request from "@/axios";

const BASE_URL = '/admin/log'

export async function addLog(params) {
    return await request({
        url: BASE_URL + '/addLog',
        method: 'post',
    }, params)
}

export async function getLogs() {
    return await request.bind(this)({
        url: BASE_URL + '/getLogs',
        method: 'get'
    })
}

export async function delLog(id) {
    return await request({
        url: BASE_URL + '/delLog',
        method: 'delete',
    }, id)
}

export async function updateLog(params) {
    return await request({
        url: BASE_URL + '/updateLog',
        method: 'patch',
    }, params)
}