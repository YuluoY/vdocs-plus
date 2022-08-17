import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'

import apis from './apis/index' // api接口

import './assets/icons/index'  // svg icons
import './assets/stylus/index.css' // 全局样式

import UI from './ui'  // 自定义ui组件
import './ui/stylus/index.css'

import './assets/css/animate.min.css' // 动画样式

import './ElementUI'

import '@/plugins' // 加载插件

Vue.config.productionTip = false
Vue.prototype.$apis = apis;
Vue.use(UI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
