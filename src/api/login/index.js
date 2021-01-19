export default {
  // 手机号登录
  loginPhone: (phone, md5PWD) => {
    // eslint-disable-next-line no-undef
    return axios({
      method: 'post',
      url: 'login/cellphone',
      data: {
        phone: phone,
        password: md5PWD
      }
    })
  }
}
