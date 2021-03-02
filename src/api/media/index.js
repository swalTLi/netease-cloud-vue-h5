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
  }
}
