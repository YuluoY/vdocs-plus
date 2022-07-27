export const router = {
    namespaced: true,
    state: {
        isLogin: true,
        routerArr: [
            {}
        ],
        admin: {}
    },
    mutations: {
        changeLoginState(state, bool) {
            state.isLogin = bool;
        },

        saveRouter(state, routes) {
            state.routerArr = routes;
        },
        saveAdminInfo(state, data) {
            state.admin = data;
        },
    },
    actions: {},
    getters: {
        updateStore(state) {
            return state.isLogin
        },
    },
    modules: {}
}