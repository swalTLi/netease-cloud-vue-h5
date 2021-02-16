<template>
  <div>
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="(item,index) in searchRules"
               :title="item.title"
               :key="index"
               :disabled="item.show">
        <!--        综合-->
        <synthesis v-if="active===0" :synthesis="result"/>
        <!--        单曲-->
        <single v-else-if="active===1" :singles="result" :key="timeKey"/>
        <!--        专辑-->
        <Album v-else-if="active===2" :album="result"/>
        <!--        歌手-->
        <singer v-else-if="active===3" :singers="result"/>
        <!--        歌单-->
        <song-list v-else-if="active===4" :songlist="result"/>
        <!--        用户-->
        <user v-else-if="active===5" :user="result"/>
        <!--        MV-->
        <MV v-else-if="active===6" :MV="result"/>
        <!--        歌词-->
        <lyrics v-else-if="active===7" :lyrics="result"/>
        <!--        电台-->
        <Radio v-else-if="active===8" :radio="result"/>
        <!--        视频-->
        <Video v-else-if="active===9" :videos="result" :key="timeKey"/>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'
import Single from '@/components/searchResult/single'
import Album from '@/components/searchResult/Album'
import Singer from '@/components/searchResult/singer'
import SongList from '@/components/searchResult/songList'
import User from '@/components/searchResult/user'
import MV from '@/components/searchResult/MV'
import Lyrics from '@/components/searchResult/lyrics'
import Radio from '@/components/searchResult/Radio'
import Video from '@/components/searchResult/video'
import synthesis from '@/components/searchResult/synthesis'
import img1 from '@/assets/image/ey24.png'

export default {
  name: 'index',
  components: { synthesis, Video, Radio, Lyrics, MV, User, SongList, Singer, Album, Single },
  data () {
    return {
      timeKey: '',
      active: 0,
      searchRules: [
        { title: '综合', type: 1018, show: false },
        { title: '单曲', type: 1, show: false },
        { title: '专辑', type: 10, show: false },
        { title: '歌手', type: 100, show: false },
        { title: '歌单', type: 1000, show: false },
        { title: '用户', type: 1002, show: false },
        { title: 'MV', type: 1004, show: true },
        { title: '歌词', type: 1006, show: false },
        { title: '电台', type: 1009, show: true },
        { title: '视频', type: 1014, show: false }
      ],
      result: ''
    }
  },
  mounted () {
    var data = new Date()
    this.timeKey = data.getTime()
    // 加载上次浏览标签
    this.active = Number(window.sessionStorage.getItem('active'))
    window.sessionStorage.setItem('active', this.active)
    this.start(this.$route.query.key, this.searchRules[this.active].type)
  },
  methods: {
    // 界面初始化函数
    start (key = this.$route.query.key, type = this.searchRules[this.active].type, offset) {
      const toast = this.$toast({
        message: '加载数据中',
        forbidClick: true,
        icon: img1
      })
      var name = 'getSearchResult' + this.searchRules[this.active].title + this.$route.query.key
      if (!localStorage('getItem', name)) {
        API.search.getSearchResult(key, type, offset).then(res => {
          // console.log(res.data.result)
          localStorage('setItem', name, res.data.result)
          this.result = res.data.result
          console.log(res.data.result)
          toast.clear()
          this.$forceUpdate()
        }).catch(e => {
        })
      } else {
        if (this.active === 0) {
          // 处理 综合标签数据
          var res = localStorage('getItem', name)
          // 处理video标签 变成双数
          if (res.video.videos.length % 2 === 1) {
            res.video.videos.pop()
          }
          // 处理歌曲标签 变成5个
          // console.log(res.song.songs.length = 5)
          this.result = res
        } else {
          this.result = localStorage('getItem', name)
        }
        toast.clear()
        this.$forceUpdate()
        var data = new Date()
        this.timeKey = data.getTime()
      }
      // console.log(this.result)
    }
  },
  watch: {
    '$route.query.key' (newV, oldV) {
      // console.log(newV, oldV)
      // API.search.getSearchResult(this.$route.query.key).then(res => {
      //   console.log(res)
      // })
      // console.log(newV, this.searchRules[this.active].type)
      this.start(newV, this.searchRules[this.active].type)
      var data = new Date()
      this.timeKey = data.getTime()
      this.$forceUpdate()
    },
    active (newV, oldV) {
      // console.log(newV, oldV)
      // 响应滑动事件
      this.start(this.$route.query.key, this.searchRules[newV].type)
      var data = new Date()
      this.timeKey = data.getTime()
      // 保存浏览标签
      window.sessionStorage.setItem('active', this.active)
    },
    result (newV, oldV) {
      this.$forceUpdate()
      // console.log('result', newV, oldV)
    }
  }
}
</script>
<style scoped lang="less">
.van-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.van-loading__spinner {
  margin-top: 40% !important;
}

/deep/ .van-tabs__line {
  background: linear-gradient(to right, seagreen, mediumseagreen);
}
</style>
