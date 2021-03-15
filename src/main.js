import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import './plugins/axios'
import VueAudio from 'vue-audio-better'
// import axios from 'axios'
// axios
// Vue.prototype.axios = axios
import VueCookie from 'vue-cookie'

Vue.use(VueAudio)
Vue.use(Lazyload, {
  lazyComponent: true
})
// Tell Vue to use the plugin

Vue.use(VueCookie)
Vue.use(Vant)
// vant
// 取消提示
Vue.config.productionTip = false

// const errorHandler = (error, vm) => {
//   console.error('抛出全局异常')
//   console.error(vm)
//   console.error(error)
// }
// Vue.config.errorHandler = errorHandler
// Vue.prototype.$throw = (error) => errorHandler(error, this)

/**
 * 全局登录钩子
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
