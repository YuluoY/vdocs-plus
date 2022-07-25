import Vue from 'vue'
import Vuex from 'vuex'

import stores from './storeModel'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        ...stores,
    }
})

