import Vue from 'vue'
import VueRouter from 'vue-router'
import { login } from '@/router/login'
import { redirect } from '@/router/redirect'
import { err } from '@/router/err'
import { main } from '@/router/main'
Vue.use(VueRouter)

const routes = [
  // 登录
  ...login,
  // 小恶鱼音乐
  ...main,
  // 错误路由
  ...err,
  // 重定向到登录
  ...redirect
]
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
