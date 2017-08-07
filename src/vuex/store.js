import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
//导入模块
import com from './modules/com'
import sel from './modules/sel'
import item from './modules/item'
import module from './modules/module'
Vue.use(Vuex)

export default new Vuex.Store({
 //   plugins: [createPersistedState()],
    modules: {
        com,
        sel,
        item,
    }
})