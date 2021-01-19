export default {
  /**
   * banner 图
   * @returns {*}
   */
  findBanners: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'banner',
      withCredentials: true
    })
  },
  /**
   * 首页导航图表按钮数据
   * @returns {*}
   */
  findHomePageIcon: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'homepage/dragon/ball',
      withCredentials: true
    })
  },
  /**
   * // 首页发现数据
   * @returns {*}
   */
  findHomepageData: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: '/homepage/block/page',
      withCredentials: true
    })
  }
}
