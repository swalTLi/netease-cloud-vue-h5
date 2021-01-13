export const loginVuex = {
  namespaced: true,
  state: () => ({
    // 当前登录状态
    isLogin: false,
    // 登陆后的用户信息
    UserInformation: {},
    //  用户个性设置
    UserSettings: {}
  }),
  getters: {

  },
  mutations: {
    // 登录成功
    loginSuccess: (state, payload) => {
      // console.log(payload)
      // 改变登录状态
      state.isLogin = true
      // 保存用户信息
      state.UserInformation = payload
    },
    // 退出登录
    loginOut: (state) => {
      state.isLogin = false
    }
  },
  actions: {
    // 登陆成功
    loginSuccess: (context, data) => {
      context.commit('loginSuccess', { UserInformation: data.res })
    }
  }
}
