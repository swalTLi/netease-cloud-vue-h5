<template>
  <transition name="fade">
    <div class="tabs" v-if="1">
      <van-tabs v-model="active" v-if="list" swipeable @click="onClickTab">
        <van-tab v-for="(item,index) in list" :title="item.name" :key="index">
<!--          内容-->
          <browse-content :videoData="videoData"/>
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
      active: 0,
      videoData: []
    }
  },
  mounted () {
    this.start()
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
          return ''
        })
      } else {
        this.list = localStorage('getItem', 'get_video_category_list')
        // console.log(this.list)
      }
      this.getTabVideo(0)
    },
    // 点击 tab 获取数据
    onClickTab (name, title) {
      this.getTabVideo(name)
    },
    // 对 tab 名称下的数据缓存
    getTabVideo (index) {
      console.log(index, this.list[index].name)
      if (!localStorage('getItem', this.list[index].name)) {
        API.video.get_video_Tags_Video_Url(this.list[index].id, 0).then(res => {
          // console.log(res.data.datas)
          // this.list = res.data.data
          localStorage('setItem', this.list[index].name, res.data.datas, 10000 * 60 * 10)
        }).catch((e) => {
          console.log(e)
        })
      } else {
        this.videoData = localStorage('getItem', this.list[index].name)
        // console.log(this.videoData)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-tabs__line {
  background: linear-gradient(to right, seagreen, mediumseagreen);
}
</style>
