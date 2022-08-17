export default {
    namespaced: true,
    state: {
        comments: [],
        allComment: [],
    },
    mutations: {
        async setCommentsByPath(state, that) {
            console.time('当前页面评论加载：')
            state.comments = (await that.$apis.web.getCommentsByPath({path: decodeURI(that.$route.path)})).data;
            console.timeEnd('当前页面评论加载：')
        },
        async setAllComment(state, that) {
            state.allComment = (await that.$apis.web.getAllComment()).data;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getCommentsByPath(state) {
            return state.comments;
        }
    }
}