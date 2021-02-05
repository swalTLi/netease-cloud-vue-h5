<template>
  <transition name="fade">
    <div class="tabs" v-if="1">
      <van-tabs v-model="active" v-if="list" swipeable @click="onClickTab">
        <van-tab v-for="(item,index) in list"
                 :title="item.name"
                 :key="index"
                 v-show="index<4">
          <!--          内容-->
          <!--          <lazy-component name="ldq">-->
          <van-loading type="spinner" color="#1989fa" v-show="loading"/>
          <transition name="fade">
            <browse-content :videoData="videoData"/>
          </transition>
          <!--          </lazy-component>-->
        </van-tab>
      </van-tabs>
    </div>
  </transition>

</template>

<script>

import { localStorage } from '../../common/localStorage'
import { api as API } from '../../api/api'
// 组件
import BrowseContent from './browseContent'

export default {
  name: 'browseVideos',
  components: { BrowseContent },
  data () {
    return {
      list: [],
      // 这个变量控制tab标签页默认index 修改成0 刷新后 点击其他页面 点击播放 在点击其他的视频播放 会发现视频不会暂停 ，不为0时 功能好使
      active: 1,
      videoData: [],
      loading: false,
      err: ''
    }
  },
  mounted () {
    this.start()
  },
  beforeRouteUpdate () {
    this.$destroy('browseVideos')
  },
  methods: {
    start () {
      if (!localStorage('getItem', 'get_video_category_list')) {
        API.video.get_video_category_list().then(res => {
          // console.log(res)
          this.list = res.data.data
          localStorage('setItem', 'get_video_category_list', res.data.data, 10000 * 60 * 10)
        }).catch((e) => {
          console.log(e)
        })
      } else {
        this.list = localStorage('getItem', 'get_video_category_list')
        // console.log(this.list)
      }
      this.getTabVideo(this.active)
    },
    // 点击 tab 获取数据
    onClickTab (name, title) {
      this.getTabVideo(name)
    },
    // 对 tab 名称下的数据缓存
    getTabVideo (index) {
      this.loading = true
      // console.log(index, this.list[index].name)
      // console.log(!localStorage('getItem', this.list[index].name))
      if (this.list[index].name === 'MV') {
        this.videoData = 1
        setTimeout(() => {
          this.err = '无法连接服务器'
          this.loading = false
        }, 3000)
        return 1
      }
      if (!localStorage('getItem', this.list[index].name)) {
        API.video.get_video_Tags_Video_Url(this.list[index].id, 0).then(res => {
          // console.log(res.data.datas)
          // this.list = res.data.data
          this.videoData = res.data.datas
          localStorage('setItem', this.list[index].name, res.data.datas)
          this.loading = false
        }).catch((e) => {
          console.log(e)
          // this.loading = false
        })
      } else {
        this.videoData = localStorage('getItem', this.list[index].name)
        // console.log(this.videoData)
        this.loading = false
      }
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
