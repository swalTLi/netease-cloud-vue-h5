// 小恶鱼音乐
export const main = [
  // 发现
  {
    path: '/Little_evil_fish_music',
    name: 'Little_evil_fish_music',
    meta: {
      keepAlive: true, // 不需要缓存
      isBack: true
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/Little_evil_fish_music'),
    // component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/find'),
    children: [
      {
        path: '' && 'find',
        name: 'find',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/find')
      },
      {
        path: 'find',
        name: 'find',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/find')
      },
      // 刷视频
      {
        path: 'video',
        name: 'video',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/video'),
        children: [
          {
            path: '',
            name: 'browseVideos',
            meta: {
              keepAlive: true, // 不需要缓存
              isBack: true
            },
            component: () => import(/* webpackChunkName: "about" */ '@/components/video/browseVideos')
          },
          {
            path: 'browseVideos',
            name: 'browseVideos',
            meta: {
              keepAlive: true, // 不需要缓存
              isBack: true
            },
            component: () => import(/* webpackChunkName: "about" */ '@/components/video/browseVideos')
          },
          {
            path: 'classification',
            name: 'classification',
            meta: {
              keepAlive: true, // 不需要缓存
              isBack: true
            },
            component: () => import(/* webpackChunkName: "about" */ '@/components/video/classification')
          }
        ]

      },
      // 云村
      {
        path: 'cloudVillage',
        name: 'Little_evil_fish_music',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/cloudVillage')
      },
      //  搜索
      {
        path: 'search',
        name: 'search',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/search')
      },
      // 搜索结果
      {
        path: 'searchResult',
        name: 'searchResult',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/searchResult')
      },
      // 我的
      {
        path: 'mine',
        name: 'mine',
        meta: {
          keepAlive: true, // 不需要缓存
          isBack: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/mainPages/mine')
      }
    ]
  }
]
