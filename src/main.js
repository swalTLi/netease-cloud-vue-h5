import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './plugins/axios'
// import axios from 'axios'
// axios
// Vue.prototype.axios = axios
import VueCookie from 'vue-cookie'
// Tell Vue to use the plugin
Vue.use(VueCookie)
Vue.use(Vant)
// vant
// 取消提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
