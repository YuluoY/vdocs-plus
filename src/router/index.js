import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import {staticRoutes} from "./routes";
import {build} from "./routerUtils";
import store from "@/store";

const buildNavRoutes = build(store.state.app.header.nav)
const buildAdminRoutes = build(store.state.admin.sidebar, 'server')
const routes = [...staticRoutes, ...buildNavRoutes, ...buildAdminRoutes]

// 将所有前端路由页面路径暴露出去
window.$hRoutes = window.$hRoutes || Object.create({});
window.$hRoutes = routes;

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
})

export default router
