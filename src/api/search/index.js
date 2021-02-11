export default {
  /**
   * 默认搜索 关键词
   * @returns {*}
   */
  searchDefaultKey: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'search/default',
      withCredentials: true
    })
  },
  searchHotDetal: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'search/hot/detail',
      withCredentials: true
    })
  },
  /**
   * 搜索建议
   *说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
   * 必选参数 : keywords : 关键词
   * 可选参数 : type : 如果传 'mobile' 则返回移动端数据
   * 接口地址 : /search/suggest
   * 调用例子 : /search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile
   */
  getSearchSuggestions: (keywords) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/search/suggest?keywords=' + keywords + '&type=mobile',
      withCredentials: true
    })
  }
}
