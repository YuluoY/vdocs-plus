export default {
    namespaced: true,
    state: {
        comments: []
    },
    mutations: {
        async setCommentsByPath(state, that) {
            state.comments = (await that.$apis.web.getCommentsByPath({path: that.$route.path})).data;
        }
    },
    actions: {},
    modules: {}
}