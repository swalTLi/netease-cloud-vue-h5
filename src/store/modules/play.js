export const play = {
  namespaced: true,
  state: () => ({
    // 播放类型 时video 还是music
    playingType: '',
    // 播放中的video的信息
    playingVideo: {
      type: 'video',
      // 资源名称
      name: '',
      // vid
      vid: ''
    },
    // 播放中的music的信息
    playingMusic: {
      type: 'video',
      // 资源名称
      name: '',
      // music mp3 id
      url: ''
    }
  }),
  getters: {},
  mutations: {

  },
  actions: {

  }
}
