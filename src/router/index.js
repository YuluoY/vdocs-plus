import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import {merge} from "@/utils";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home')
    },
]


const baseRouterArr = [];
routes.forEach(item => baseRouterArr.push(item.path))

const dynamicRouter = buildNavRoutes(store.state.app.header.nav)

// 构建动态路由
function buildNavRoutes(arr, routes = []) {
    const routerArr = routes
    arr.forEach(item => {
        const router = {};
        if (!baseRouterArr.includes(item.path)) {
            router.path = item.path;
            router.component = () => import(`@/views/${item.label}`);
            router.meta = item;
            if (item.children) {
                router.children = buildNavRoutes(item.children);
            }
            routerArr.push(router)
        }
    })
    return routerArr;
}

// 将所有路由页面路径暴露出去
window.$hRoutes = window.$hRoutes || Object.create({});
window.$hRoutes = {...routes, ...dynamicRouter};

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
})

// 添加动态路由
setTimeout(() => dynamicRouter.forEach(item => router.addRoute(item)));

export default router
