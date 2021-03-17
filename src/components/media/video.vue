<template>
  <div>
<!--    {{url}}-->
    <video
      autoplay="autoplay"
      v-if="url"
      :id="title"
      :src="url"
      loop
      :poster="cover"/>
  </div>
</template>

<script>
import { api as API } from '@/api/api'

export default {
  name: 'videos',
  props: ['vid', 'play', 'cover', 'title'],
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    async  start () {
      await API.media.getVideoUrl(this.vid).then(res => {
        // console.log(res.data)
        try {
          this.url = res.data.urls[0].url
        } catch (e) {
          // url 无数据提示数据找不到,返回上一页
          this.$toast({ message: '无版权!' })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
video {
  width: 100%;
  height: 100%;
}
</style>
