// 登录
export const login = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/loginPage',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/loginPage'),
    children: [
      { path: 'Phone', component: () => import('@/views/login/loginPage') },
      { path: 'ExperienceNow', component: () => import('@/views/login/loginPage') },
      { path: 'WeChat', component: () => import('@/views/login/loginPage') },
      { path: 'QQ', component: () => import('@/views/login/loginPage') },
      { path: 'SinaWeibo', component: () => import('@/views/login/loginPage') },
      { path: 'Netease', component: () => import('@/views/login/loginPage') }
    ]
  }
]
