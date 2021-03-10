// media
export const media = [
  {
    path: '/media',
    name: 'media',
    component: () => import(/* webpackChunkName: "about" */ '@/views/media/media.vue'),
    children: [
      // 用户详细信息
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/infoPage.vue')
      },
      // 歌手详细信息
      {
        path: 'singerInfo',
        name: 'singerInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/infoPage.vue')
      },
      //  专辑信息 歌曲展示
      {
        path: 'ablumInfo',
        name: 'ablumInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/infoPage.vue')
      },
      // 歌单信息 歌曲展示
      {
        path: 'singerInfo',
        name: 'singerInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/infoPage.vue')
      },
      // 专辑
      {
        path: 'AlbumInfo',
        name: 'AlbumInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/Album.vue')
      },
      //  歌单
      {
        path: 'songListInfo',
        name: 'songListInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/songList.vue')
      }
    ]
  }
]
