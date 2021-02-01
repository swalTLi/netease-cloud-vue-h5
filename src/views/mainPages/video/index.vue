<template>
<!--    <browse-videos  v-if="true"/>-->
<!--    <Classification v-if="false"/>-->
<!--  <transition name="fade">-->
    <router-view/>
<!--  </transition>-->
</template>

<script>
// import { localStorage } from '../../../common/localStorage'
// import { api as API } from '../../../api/api'
// 组件
// import Classification from '../../../components/video/classification'
// import BrowseVideos from '../../../components/video/browseVideos'
export default {
  name: 'Video',
  // components: { BrowseVideos, Classification },
  data () {
    return {
      active: 1,
      list: []
    }
  },
  mounted () {
    // if (!localStorage('getItem', 'getVideoGroupList')) {
    //   API.video.get_video_group_list().then(res => {
    //     console.log(res)
    //     this.list = res.data.data
    //     localStorage('setItem', 'getVideoGroupList', res.data.data, 10000 * 60 * 10)
    //   }).catch((e) => {
    //     console.log(e)
    //   })
    // } else {
    //   this.list = localStorage('getItem', 'getVideoGroupList')
    //   console.log(this.list)
    // }
  },
  methods: {
    onClick (name, title) {
      console.log(name, title)
    }
  }
}
</script>

<style scoped lang="less">

</style>
