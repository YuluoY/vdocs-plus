export default {
    namespaced: true,
    state: {
        comments: [],
        allComment: [],
    },
    mutations: {
        async setCommentsByPath(state, that) {
            state.comments = (await that.$apis.web.getCommentsByPath({path: that.$route.path})).data;
        },
        async setAllComment(state, that){
            state.allComment = (await  that.$apis.web.getAllComment()).data;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getComments(state){
            return state.comments;
        }
    }
}