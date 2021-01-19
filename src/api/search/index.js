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
  }
}
