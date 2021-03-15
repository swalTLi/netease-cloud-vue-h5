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
      // 专辑内的歌曲
      {
        path: 'AlbumInfo',
        name: 'AlbumInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/Album.vue')
      },
      //  歌单内的歌曲
      {
        path: 'songListInfo',
        name: 'songListInfo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/songList.vue')
      },
      //  无限视频
      {
        path: 'infiniteVideo',
        name: 'infiniteVideo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/videoPlay.vue')
      },
      //  音乐界面
      {
        path: 'MusicPlaying',
        name: 'MusicPlaying',
        component: () => import(/* webpackChunkName: "about" */ '@/views/media/musicPlay.vue')
      }
    ]
  }
]
