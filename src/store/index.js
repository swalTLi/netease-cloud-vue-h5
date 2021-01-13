import Vue from 'vue'
import Vuex from 'vuex'
// login有关的数据
// eslint-disable-next-line no-unused-vars
import { loginVuex } from '@/store/modules/login'
// vuex 持久化插件
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginVuex
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer (val) {
        return {
          loginVuex: val.loginVuex
        }
      }
    })
  ]
})
