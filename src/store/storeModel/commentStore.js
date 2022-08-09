export default {
    namespaced: true,
    state: {
        comments: [],
        allComment: [],
    },
    mutations: {
        async setCommentsByPath(state, that) {
            state.comments = (await that.$apis.web.getCommentsByPath({path: that.$route.path})).data;
            // const idAndOrder = {};
            // state.comments.forEach((c, i, arr) => idAndOrder[c._id] = i)
            //
            // state.comments.forEach((c, i, arr) => {
            //     if (c.sub.length > 0) {
            //         const arr2 = [];
            //         const subKeys = Object.keys(idAndOrder).filter(k => c.sub.includes(k))
            //         subKeys.forEach(subKey => {
            //             const obj = Object.assign({}, arr[idAndOrder[subKey]])
            //             obj.isSub = false
            //             arr2.push(obj)
            //         })
            //         arr[i].sub = arr2;
            //     }
            //     if (c.isSub) {
            //         delete arr[i]
            //     }
            // })
            // state.comments = state.comments.filter(i => i)
            // console.log(state.comments)
        },
        async setAllComment(state, that) {
            state.allComment = (await that.$apis.web.getAllComment()).data;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getComments(state) {
            return state.comments;
        }
    }
}