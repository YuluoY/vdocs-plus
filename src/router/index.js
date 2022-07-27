import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import {staticRoutes, build} from "@/router/routes";
import store from "@/store";

const buildNavRoutes = build(store.state.app.header.nav)
const routes = [...staticRoutes, ...buildNavRoutes]

// 将所有前端路由页面路径暴露出去
window.$hRoutes = window.$hRoutes || Object.create({});
window.$hRoutes = routes;

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
})

export default router
