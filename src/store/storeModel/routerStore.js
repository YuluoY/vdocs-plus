export const router = {
    namespaced: true,
    state: {
        isLogin: false,
        routerArr: []
    },
    mutations: {
        changeStore(state, bool){
            state.isLogin = bool;
        },
        saveRouter(state, routes){
            state.routerArr = routes;
        }
    },
    actions: {},
    getters:{
        updateStore(state){
            return state.isLogin
        },
    },
    modules: {}
}