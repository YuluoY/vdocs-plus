import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'

import apis from './apis/index'

import './assets/icons/index'  // svg icons
import './assets/stylus/index.css'
import UI from './ui'
import './ui/stylus/index.css'
import './assets/css/animate.min.css'

import './ElementUI'

Vue.config.productionTip = false
Vue.prototype.$apis = apis;
Vue.use(UI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
