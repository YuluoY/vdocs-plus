import request from "@/axios";

export async function addArticle(params) {
    return await request({
        url: '/admin/article/addArticle',
        method: 'post',
    }, params)
}