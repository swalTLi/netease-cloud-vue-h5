<template>
  <div>
    video
  </div>
</template>

<script>
import { localStorage } from '../../../common/localStorage'
import { api as API } from '../../../api/api'
// 组件
export default {
  name: 'Video',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    if (!localStorage('getItem', 'getVideoGroupList')) {
      API.video.get_video_group_list().then(res => {
        console.log(res)
        this.list = res.data.data
        localStorage('setItem', 'getVideoGroupList', res.data.data, 10000 * 60 * 10)
      }).catch((e) => {
        console.log(e)
      })
    } else {
      this.list = localStorage('getItem', 'getVideoGroupList')
      console.log(this.list)
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
