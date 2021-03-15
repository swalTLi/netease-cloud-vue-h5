import { api as API } from '@/api/api'

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
      type: 'music',
      typeInfo: '单曲',
      // 正在播放音乐的key 下标
      listIndex: 0,
      // 正在播放音乐的 歌词
      musicLyric: '',
      // 当前歌单
      list: [],
      AuthorID: '',
      AuthorName: '',
      singleBackground: '',
      // 正在播放音乐的id
      singleID: '',
      singleImg: '',
      // 正在音乐的名称
      singleName: '',
      // 正在播放音乐的url
      url: ''
    }
  }),
  // state的计算属性 可以过滤数据
  getters: {
    // // 获取歌曲信息 mp3
    // getMusic: () => {
    //
    // },
    // // 获得歌曲歌词
    // getmusicLyric: () => {
    //
    // }
  },
  // 提交修改state 仅同步
  mutations: {
    // 离开播放页面
    clearLyric: (state, playload) => {
      if (playload) {
        state.playingMusic.musicLyric = ''
      }
    },
    // 保存歌曲信息 mp3
    setMusic: (state, playload) => {
      // console.log(playload)
      // console.log(state.playingMusic)
      state.playingMusic.singleName = playload.singerName
      state.playingMusic.singerID = playload.singerID
      state.playingMusic.url = playload.url
      state.playingMusic.singleImg = playload.singleImg
      state.playingMusic.singleBackground = playload.singleBackground
      state.playingMusic.AuthorName = playload.AuthorName
      state.playingMusic.AuthorID = playload.AuthorID
      // console.log(state.playingMusic)
    },
    // 保存歌曲歌词
    setmusicLyric: (state, playload) => {
      state.playingMusic.musicLyric = playload.lyric
      // console.log(state.playingMusic.lyric)
    }
  },
  // 提交mutations 支持异步操作
  actions: {
    // 离开播放页面
    clearLyric: (context, data) => {
      context.commit('clearLyric', true)
    },
    // 获取歌曲播放地址mp3
    getMusic: (context, data) => {
      // console.log(data)
      API.media.getSongUrl(data.singleID).then(res => {
        // console.log(res.data.data[0])
        //  提交修改mutations数据
        context.commit('setMusic', {
          ...data,
          url: res.data.data[0].url
        })
      })
    },
    // 获得歌曲歌词
    getMusicLyric: (context, data) => {
      // console.log(data)
      API.media.getLyirs(data.singleID).then(res => {
        // console.log(res.data.lrc)
        if (res.data.lrc !== undefined && res.data.lrc.lyric) {
          context.commit('setmusicLyric', {
            ...data,
            lyric: res.data.lrc.lyric
          })
        }
      })
    },
    // 获取相似歌曲
    getMusicList: (context, data) => {
      API.media.getLyirs(this.query.singleID).then(res => {
        return res.data
      })
    }
  }
}
