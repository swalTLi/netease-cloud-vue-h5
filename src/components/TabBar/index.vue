<template>
  <van-tabbar v-model="active" active-color="mediumseagreen">
    <van-tabbar-item replace :to="path+'/find'">
      <span>发现</span>
      <template #icon="props">
        <transition name="fade">
          <img v-if="true" :src="!props.active ? findIcon.active : findIcon.inactive" alt=""/>
        </transition>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace :to="path+'/search'">
      <span>歌曲搜索</span>
      <template #icon="props">
        <transition name="fade">
          <img :src="!props.active ? searchIcon.active : searchIcon.inactive" alt=""/>
        </transition>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace :to="path+'/video'">
      <span>刷视频</span>
      <template #icon="props">
        <transition name="fade">
          <img :src="!props.active ? video.active : video.inactive" alt=""/>
        </transition>
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace :to="path+'/mine'">
      <span>我的</span>
      <template #icon="props">
        <transition name="fade">
          <img :src="!props.active ? mine.active : mine.inactive" alt=""/>
        </transition>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import find from '../../assets/image/find24.png'
import Active from '../../assets/image/active24.png'
import search from '../../assets/image/search24.png'
import mine from '../../assets/image/mine24.png'
import video from '../../assets/image/video24.png'

export default {
  name: 'index',
  data () {
    return {
      path: '/Little_evil_fish_music',
      active: 0,
      findIcon: {
        active: find,
        inactive: Active
      },
      searchIcon: {
        active: search,
        inactive: Active
      },
      mine: {
        active: mine,
        inactive: Active
      },
      video: {
        active: video,
        inactive: Active
      },

      route: {
        find: 0,
        search: 1,
        video: 2,
        mine: 3
      }
    }
  },
  mounted () {
    // console.log(2)
    this.active = this.route[this.$route.fullPath.split('/')[2]]
  },
  watch: {
    // 改变激活状态
    '$route.fullPath' (newV, oldV) {
      this.active = this.route[newV.split('/')[2]]
    }
  }
}
</script>

<style scoped lang="less">

</style>
