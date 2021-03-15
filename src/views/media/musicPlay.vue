`
<template>
  <!--  听音乐页面-->
  <div class="main">
    <MediaNav/>
    <div class="list">
      <div class="title">{{ this.query.singleName }}</div>
      <div class="imgBox">
        <img class="bacImg" :src="this.query.singleBackground" alt="" width="100%">
      </div>
      <van-skeleton title :row="3" :loading="loading">
        <div class="info">
          <div class="left">
            <!--            <span style="font-size: 1rem;font-weight: bold;color: black;">-->

            <!--            </span>-->
            <span style="font-size: 1.1rem;color: #c9c9c9;">
              {{ this.query.AuthorName }}
            </span>
            <div class="btn">
            </div>
            <div class="btn">
              <van-button
                size="mini"
                color="linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)">
                专辑
              </van-button>
            </div>
            <div class="btn">
              <van-button
                size="mini"
                color="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)">
                歌单
              </van-button>
            </div>
            <div class="btn">
              <van-button
                size="mini"
                color="linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)">
                简介
              </van-button>
            </div>
          </div>
          <div class="right">
            <img v-if="this.query.singleBackground"
                 :src="this.query.singleBackground"
                 alt=""></div>
        </div>
        <div class="advertisement">
          <adv style="width: 100%;height: 100%;"/>
        </div>
        <div class="lyric">
          <div class="lyricPanel">
            <lyric
              v-if="playingMusic.musicLyric"
              :singleID="query.singleID"
              :text="playingMusic.musicLyric"
              :src="playingMusic.url"
            />
<!--            {{ playingMusic.musicLyric }}-->
          </div>
        </div>
        <div class="playControl">
<!--          <mini-audio-->
<!--            audio-source=""-->
<!--          ></mini-audio>-->
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import MediaNav from '@/components/Navbar/mediaNav'
import Adv from '@/components/search/adv'
import { createNamespacedHelpers } from 'vuex'
import lyric from '@/components/media/lyric'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('playVuex')
export default {
  name: 'musicPlay',
  components: { Adv, MediaNav, lyric },
  data () {
    return {
      query: {},
      loading: false,
      playMusic: {}
    }
  },
  created () {
    this.query = this.$route.query
  },
  computed: {
    ...mapState(['playingMusic']),
    ...mapGetters([])
  },
  mounted () {
    console.log(this.$route.query)
    this.start()
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  beforeRouteLeave (to, form, next) {
    this.clearLyric(true)
    next()
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['getMusic', 'getMusicLyric', 'getMusicList', 'clearLyric']),
    start () {
      this.Music()
      this.likeMusic()
    },
    Music () {
      var promise = Promise.resolve()
      promise
        .then(() => {
          // 获取音乐信息
          this.getMusic(this.$route.query)
        }).catch((e) => { this.e(e) })
        .then(() => {
          // 获取音乐歌词
          this.getMusicLyric(this.$route.query)
        }).catch((e) => { this.e(e) })
        .then(() => {
          //  渲染歌词
          setTimeout(() => {
            // console.log(this.playingMusic.musicLyric)
          }, 100)
        }).catch(e => { this.e(e) })
      // new Promise((resolve, reject) => {
      //   // 获取音乐信息
      //   this.getMusic(this.$route.query)
      //   console.log(0)
      //   resolve(true)
      // }).then((res) => {
      //   console.log(res)
      //   // 获取音乐歌词
      //   this.getMusicLyric(this.$route.query)
      // }).then(() => {
      // }).then(() => {
      // })
    },
    // //  获取音乐信息
    // new Promise((resolve, reject) => {
    //   var info, lyric
    //   //  根据id获取数据
    //   API.media.getSongUrl(this.query.singleID).then(res => {
    //     info = res.data.data[0]
    //   }).then(() => {
    //     //  获取歌词
    //     API.media.getLyirs(this.query.singleID).then(res2 => {
    //       lyric = res2.data.lrc.lyric
    //       resolve([info, lyric])
    //     })
    //   })
    // }).then((res) => {
    //   //  渲染歌词
    //   console.log(res[0], res[1])
    //   return 1
    // }).then((res) => {
    //   //  把获取的数据保存到session/cookie
    //   //  添加到vuex的播放列表内
    //   console.log(res)
    //   return 2
    // }).then((res) => {
    //   //  同步播放( 歌词音乐 )
    //   console.log(res)
    // }, (e) => {
    //   console.log('error message', e)
    // })
    likeMusic () {
      //  获取推荐音乐
      //  添加到vuex的播放列表内
    },
    deleteMusic () {
      //  从播放列表内删除当前音乐
    },
    e (e) {
      console.log(e)
    },
    // 页面滑动事件
    touchEvent () {
      //  下滑事件
      const touchType = {
        Up: () => {

        },
        Down: () => {

        }
      }
      //  上滑事件
      //  type Up && Down
      var getMusciInfo = function (type) {
        //  通过vuex获取下一个音乐信息
        //  通过vuex获取上一个音乐
        //  返回 touchType 事件
        return touchType[type]
      }
      return getMusciInfo()
    },
    downloadMusic () {
      //  下载当前音乐
    },
    runLyric () {
    }
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;

  .list {
    width: 100vw;
    height: 100vh;
    position: relative;
    top: -6vh;
    z-index: -1;
    background: #435560;

    .imgBox {
      width: 100%;
      height: 100%;
      filter: blur(10px);
      position: absolute;
      object-fit: cover;
      top: -6vh;
      z-index: -1;
    }

    .bacImg {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      position: absolute;
      z-index: -1;
      -webkit-filter: contrast(30%);
    }

    .title {
      margin: auto;
      width: 60vw;
      height: 6vh;
      display: flex;
      align-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: white;
      overflow: hidden;
      white-space: nowrap;
    }

    .van-skeleton {
      margin-top: 10vh;
    }

    .info {
      margin: auto;
      margin-top: 1vh;
      width: 94vw;
      height: 25vh;
      //background: sienna;
      display: flex;
      justify-content: space-between;

      .left {
        width: 30vw;
        height: 25vh;
        //background: red;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: auto;

        span {
          width: 100%;
          padding-left: 5%;
        }

        .btn {
          display: flex;
          justify-content: start;
          padding-left: 5%;
          width: 100%;

          /deep/ .van-button {
            width: 60% !important;
            font-size: 0.1rem;
            box-shadow: 1px 1px whitesmoke;

            span {
              padding-left: 0;
            }
          }
        }
      }

      .right {
        width: 62vw;
        height: 25vh;

        img {
          border-radius: 5vw;
          border: 2px solid white;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .advertisement {
      margin: auto;
      //margin-top: 1vh;
      width: 94vw;
      height: 7vh;
      //background: aquamarine;
    }

    .lyric {
      margin: auto;
      margin-top: 1vh;
      width: 90vw;
      height: 53vh;
      display: flex;
      justify-content: center;
      //background: forestgreen;
    }

    .playControl {
      margin: auto;
      margin-top: 1vh;
      width: 100vw;
      height: 0vh;
      //background: white;
      display: flex;
      justify-content: center;

      .mini-audio {
        width: 100%;
        height: 9vh !important;
        //object-fit: cover;
      }
    }
  }
}

.lyricPanel {
  width: 100%;
  height: 100%;
  //border: 1px solid red;
  overflow-y: scroll;
}
</style>
