import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'

import request from './axios'
import apis from './apis/index'

import './assets/icons/index'  // svg icons
import './assets/stylus/index.css'
import UI from './ui'
import './ui/stylus/index.css'
import './assets/css/animate.min.css'

import VueMarkdownEditor from '@/plugins/VueMarkdownEditor/index'

Vue.use(VueMarkdownEditor);

Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.prototype.$apis = apis;
Vue.use(UI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
