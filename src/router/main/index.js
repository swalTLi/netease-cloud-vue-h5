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
  // 云村
  {
    path: '/cloudVillage',
    name: 'Little_evil_fish_music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/cloudVillage')
  },
  //  搜索
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/search')
  },
  // 我的
  {
    path: '/mine',
    name: 'Little_evil_fish_music',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/mine')
  }
]
