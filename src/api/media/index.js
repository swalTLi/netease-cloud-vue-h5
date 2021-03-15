export default {
  /**
   * 获取歌手详情
   * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
   * 必选参数 : id: 歌手 id
   * 接口地址 : /artist/detail
   * 调用例子 : /artist/detail?id=11972054 (Billie Eilish)
   */
  getSingerDetail: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/artist/detail?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   * 歌手热门50首歌曲
   * 说明 : 调用此接口,可获取歌手热门50首歌曲
   * 必选参数 :
   * id : 歌手 id
   * 接口地址 : /artist/top/song
   * 调用例子 : /artist/top/song?id=6452
   */
  getSingersMusics: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/artist/top/song?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   * 获取歌手专辑
   * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
   * 必选参数 : id: 歌手 id
   * 可选参数 : limit: 取出数量 , 默认为 50
   * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
   * 接口地址 : /artist/album
   * 调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )
   * 返回数据如下图 : 获取专辑内容
   */
  getSingerAlbum: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/artist/album?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   * 获取歌手mv
   */
  getSingerMV: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/artist/mv?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   ** ### 获取专辑内容
   ** 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
   ** 必选参数 :** `id`: 专辑 id
   ** 接口地址 :** `/album`
   ** 调用例子 :** `/album?id=32311`
   */
  getAlbumContentByID: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/album?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   ** 获取歌单详情
   ** 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
   ** 必选参数 : id : 歌单 id
   ** 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
   ** 接口地址 : /playlist/detail
   ** 调用例子 : /playlist/detail?id=24381616
   */
  getSongListContentById: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/playlist/detail?id=' + id +
      '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   ** 获取音乐 url
   ** 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
   ** 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
   ** 必选参数 : id : 音乐 id
   ** 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
   ** 接口地址 : /song/url
   ** 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
   */
  getSongUrl: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/song/url?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   **  获取歌词
   **  说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
   **  必选参数 : id: 音乐 id
   **  接口地址 : /lyric
   **  调用例子 : /lyric?id=33894312
   **  返回数据如下图 : 获取歌词
   */
  getLyirs: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/lyric?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   * ### 获取相似音乐

   说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌曲

   **必选参数 :** `id`: 歌曲 id

   **接口地址 :** `/simi/song`

   **调用例子 :** `/simi/song?id=347230` ( 对应 ' 光辉岁月 ' 相似歌曲 )
   */
  getLikeSong: (id) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/simi/song?id=' + id,
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  }
}
