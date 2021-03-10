export default {
  /**
   *  获取视频标签列表
   *
   *  说明 : 调用此接口 , 可获取视频标签列表
   *  接口地址 : /video/group/list
   *  调用例子 : /video/group/list
   *  需要登录
   * @returns {*}
   */
  get_video_group_list: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'video/group/list' + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   *  获取视频分类列表  XXX
   *
   *  说明 : 调用此接口 , 可获取视频分类列表
   *  接口地址 : /video/category/list
   *  调用例子 : /video/category/list
   */

  get_video_category_list: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'post',
      url: 'video/category/list?cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  /**
   *  获取视频标签/分类下的视频
   *
   *  说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
   *  必选参数 : id: videoGroup 的 vid 属性
   *  可选参数 : offset: 默认0
   *  接口地址 : /video/group
   *  调用例子 : /video/group?id=9104
   */
  get_video_Tags_Video_Url: (id, offset = 0) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/group?id=' + id + '&offset=' + offset + '&cookie=' + window.localStorage.getItem('cookie'),
      // + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   *  获取全部视频列表   （ 可以直接播放的视频列表 ）  XXX
   *  直接使用 vid 找到视频
   *  说明 : 调用此接口,可获取视频分类列表,分页参数只能传入offset
   *  可选参数 : offset: 默认0
   *  接口地址 : /video/timeline/all
   *  调用例子 : /video/timeline/all
   */
  get_all_video_list: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/timeline/all' + '&cookie=' + window.localStorage.getItem('cookie'),
      withCredentials: true
    })
  },
  /**
   *  获取推荐视频
   *
   *  说明 : 调用此接口, 可获取推荐视频,分页参数只能传入offset
   *  可选参数 : offset: 默认0
   *  接口地址 : /video/timeline/recommend
   *  调用例子 : /video/timeline/recommend?offset=10
   */
  get_recommend_video: (offset = 0) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/timeline/recommend',
      withCredentials: true
    })
  },
  /**
   *  相关视频
   *
   *  说明 : 调用此接口 , 可获取相关视频
   *  必选参数 : id: 视频 的 id
   *  接口地址 : /related/allvideo
   *  调用例子 : /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D
   */
  get_related_allvideo: (vid) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/related/allvideo?id=' + vid,
      withCredentials: true
    })
  },
  /**
   *  视频详情
   *
   *  说明 : 调用此接口 , 可获取视频详情
   *  必选参数 : id: 视频 的 vid
   *  接口地址 : /video/detail
   *  调用例子 : /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
   */
  get_video_detail: (vid) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/detail?id=' + vid,
      withCredentials: true
    })
  },
  /**
   *  获取视频点赞转发评论数数据
   *
   *  说明 : 调用此接口 , 传入 vid ( 视频id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频id
   *  接口地址 : /video/detail/info
   *  调用例子 : /video/detail/info?vid=89ADDE33C0AAE8EC14B99F6750DB954D
   */
  get_video_datail_info: (vid) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/detail/info?vid=' + vid,
      withCredentials: true
    })
  },
  /**
   *  获取视频播放地址
   *
   *  说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
   *  必选参数 : id: 视频 的 id
   *  接口地址 : /video/url
   *  调用例子 : /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
   */
  get_video_url: (vid) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/video/url?id=' + vid,
      withCredentials: true
    })
  }
}
