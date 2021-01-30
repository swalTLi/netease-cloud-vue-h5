export default {
  // 手机号登录
  loginPhone: (phone = 13898102230, md5PWD = 'Ldq2586463185') => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'post',
      url: 'login/cellphone',
      data: {
        phone: phone,
        password: md5PWD
      }
    })
  },
  /**
   * 获取登录状态
   * @returns {*}
   */
  getLoginStatus: () => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'get',
      url: 'login/status'
    })
  }
}
