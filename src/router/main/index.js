// 小恶鱼音乐
export const main = [
  // 发现
  {
    path: '/Little_evil_fish_music',
    name: 'Little_evil_fish_music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/Little_evil_fish_music')
  },
  // 刷视频
  {
    path: '/video',
    name: 'video',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/video')
  },
  // 我的
  {
    path: '/my',
    name: 'Little_evil_fish_music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/my')
  },
  // 云村
  {
    path: '/cloudVillage',
    name: 'Little_evil_fish_music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/cloudVillage')
  }
]
