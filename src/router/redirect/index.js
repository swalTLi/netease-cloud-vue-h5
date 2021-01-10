// 重定向
export const redirect = [
  {
    path: '/*',
    component: () => import(/* webpackChunkName: "about" */ '@/views/redirect/redirect.vue')
  }
]
