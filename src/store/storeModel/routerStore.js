export default {
    namespaced: true,
    state: {
        isLogin: JSON.parse(localStorage.getItem('h-admin-login') || ''),
        routerArr: [
            {}
        ],
        admin: {}
    },
    mutations: {
        changeLoginState(state, bool) {
            state.isLogin = bool;
            localStorage.setItem('h-admin-login', JSON.stringify(state.isLogin));
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