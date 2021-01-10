// 登录
export const err = [
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "about" */ '@/views/error/error.vue')
  }
]
