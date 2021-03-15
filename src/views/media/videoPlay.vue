<template>
<!--  刷视频页面-->
<div>
  <MediaNav/>
  videoPlay.vue
</div>
</template>

<script>
import MediaNav from '@/components/Navbar/mediaNav'
export default {
  name: 'videoPlay',
  components: { MediaNav },
  data () {
    return {

    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      console.log(this.$route.params)
      console.log(this.$route.query)
    }
  }
}
</script>

<style scoped lang="less">

</style>
<!--<template>-->
<!--  &lt;!&ndash;  听音乐页面&ndash;&gt;-->
<!--  <div class="main">-->
<!--    <MediaNav/>-->
<!--    <div class="list">-->
<!--      <div class="title">ldq的音乐</div>-->
<!--      <div class="info"></div>-->
<!--      <div class="advertisement"></div>-->
<!--      <div class="lyric"></div>-->
<!--      <div class="playControl"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import MediaNav from '@/components/Navbar/mediaNav'-->

<!--export default {-->
<!--  name: 'musicPlay',-->
<!--  components: { MediaNav },-->
<!--  data () {-->
<!--    return {-->
<!--      playMusic: {}-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    console.log(this.$route.params)-->
<!--    console.log(this.$route.query)-->
<!--    this.start()-->
<!--  },-->
<!--  methods: {-->
<!--    start () {-->
<!--      this.nowMusic()-->
<!--      this.likeMusic()-->
<!--    },-->
<!--    nowMusic () {-->
<!--      //  获取音乐信息-->
<!--      //  根据id获取数据-->
<!--      //  获取歌词-->
<!--      //  添加到vuex的播放列表内-->
<!--      //  把获取的数据保存到session/cookie-->
<!--      //  同步播放( 歌词音乐 )-->
<!--    },-->
<!--    likeMusic () {-->
<!--      //  获取推荐音乐-->
<!--      //  添加到vuex的播放列表内-->
<!--    },-->
<!--    deleteMusic () {-->
<!--      //  从播放列表内删除当前音乐-->
<!--    },-->
<!--    // 页面滑动事件-->
<!--    touchEvent () {-->
<!--      //  下滑事件-->
<!--      const touchType = {-->
<!--        Up: () => {-->

<!--        },-->
<!--        Down: () => {-->

<!--        }-->
<!--      }-->
<!--      //  上滑事件-->
<!--      //  type Up && Down-->
<!--      var getMusciInfo = function (type) {-->
<!--        //  通过vuex获取下一个音乐信息-->
<!--        //  通过vuex获取上一个音乐-->
<!--        //  返回 touchType 事件-->
<!--        return touchType[type]-->
<!--      }-->
<!--      return getMusciInfo()-->
<!--    },-->
<!--    downloadMusic () {-->
<!--      //  下载当前音乐-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--.main {-->
<!--  width: 100vw;-->
<!--  height: 100vh;-->

<!--  .list {-->
<!--    width: 100vw;-->
<!--    height: 100vh;-->
<!--    position: relative;-->
<!--    background: black;-->
<!--    top: -6vh;-->
<!--    z-index: -1;-->

<!--    .title {-->
<!--      width: 100vw;-->
<!--      height: 6vh;-->
<!--      background: red;-->
<!--      text-align: center;-->
<!--      display: flex;-->
<!--      align-content: center;-->
<!--      align-items: center;-->
<!--      justify-content: center;-->
<!--      font-size: 1.5rem;-->
<!--      color: white;-->
<!--    }-->

<!--    .info {-->
<!--      margin: auto;-->
<!--      margin-top: 1vh;-->
<!--      width: 94vw;-->
<!--      height: 30vh;-->
<!--      background: sienna;-->
<!--    }-->

<!--    .advertisement {-->
<!--      margin: auto;-->
<!--      margin-top: 1vh;-->
<!--      width: 94vw;-->
<!--      height: 7vh;-->
<!--      background: aquamarine;-->
<!--    }-->

<!--    .lyric {-->
<!--      margin: auto;-->
<!--      margin-top: 1vh;-->
<!--      width: 94vw;-->
<!--      height: 43vh;-->
<!--      background: forestgreen;-->
<!--    }-->

<!--    .playControl {-->
<!--      margin: auto;-->
<!--      margin-top: 1vh;-->
<!--      width: 94vw;-->
<!--      height: 9vh;-->
<!--      background: white;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
