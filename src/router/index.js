import Vue from 'vue'
import VueRouter from 'vue-router'
import { login } from '@/router/login'
import { redirect } from '@/router/redirect'
import { err } from '@/router/err'
import { main } from '@/router/main'
import { media } from '@/router/media'

Vue.use(VueRouter)

const routes = [
  // 登录
  ...login,
  // 小恶鱼音乐 用户页面 主页
  ...main,
  // 媒体页面 歌手用户信息 ， 歌曲播放 视频推荐播放 详细歌单 详细专辑
  ...media,
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
