<template>
  <div>
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="(item,index) in searchRules"
               :title="item.title"
               :key="index"
               :disabled="disabled[item.title]">
      <!--        单曲-->
        <single v-if="active===0" :singles="result"/>
        <!--        专辑-->
        <Album v-else-if="active===1" :single="result"/>
        <!--        歌手-->
        <singer v-else-if="active===2" :single="result"/>
        <!--        歌单-->
        <song-list v-else-if="active===3" :single="result"/>
        <!--        用户-->
        <user v-else-if="active===4" :single="result"/>
        <!--        MV-->
        <MV v-else-if="active===5" :single="result"/>
        <!--        歌词-->
        <lyrics v-else-if="active===6" :single="result"/>
        <!--        电台-->
        <Radio v-else-if="active===7" :single="result"/>
        <!--        视频-->
        <Video v-else-if="active===8" :single="result"/>
        <!--        综合-->
        <Synthesis v-else-if="active===9" :single="result"/>
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
import Synthesis from '@/components/searchResult/Synthesis'

export default {
  name: 'index',
  components: { Synthesis, Video, Radio, Lyrics, MV, User, SongList, Singer, Album, Single },
  data () {
    return {
      active: 0,
      searchRules: [
        { title: '单曲', type: 1 },
        { title: '专辑', type: 10 },
        { title: '歌手', type: 100 },
        { title: '歌单', type: 1000 },
        { title: '用户', type: 1002 },
        { title: 'MV', type: 1004 },
        { title: '歌词', type: 1006 },
        { title: '电台', type: 1009 },
        { title: '视频', type: 1014 },
        { title: '综合', type: 1018 }
      ],
      disabled: {
        单曲: false,
        专辑: true,
        歌手: false,
        歌单: false
      },
      result: ''
    }
  },
  mounted () {
    this.start(this.$route.query.key, this.searchRules[this.active].type)
  },
  methods: {
    // 界面初始化函数
    start (key, type, offset) {
      var name = 'getSearchResult' + this.searchRules[this.active].title + this.$route.query.key
      if (!localStorage('getItem', name)) {
        API.search.getSearchResult(key, type, offset).then(res => {
          // console.log(res.data.result)
          localStorage('setItem', name, res.data.result)
          this.result = res.data.result
          this.$forceUpdate()
        }).catch(e => {
        })
      } else {
        this.result = localStorage('getItem', name)
        this.$forceUpdate()
      }
    }
  },
  watch: {
    '$route.query.key' (newV, oldV) {
      // console.log(newV, oldV)
      // API.search.getSearchResult(this.$route.query.key).then(res => {
      //   console.log(res)
      // })
      console.log(newV, this.searchRules[this.active].type)
      this.$forceUpdate()
      this.start(newV, this.searchRules[this.active].type)
    },
    active (newV, oldV) {
      // console.log(newV, oldV)
      // 响应滑动事件
      this.start(this.$route.query.key, this.searchRules[newV].type)
    },
    result (newV, oldV) {
      this.$forceUpdate()
      console.log('result', newV, oldV)
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
