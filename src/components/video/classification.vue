<template>
  <transition name="fade">
    <div class="tabs" v-if="1">
      <van-tabs v-model="active" swipeable @click="onClick">
        <van-tab v-for="index in 14" :title="'选项 ' + index" :key="index">
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
  </transition>

</template>

<script>
import { localStorage } from '../../common/localStorage'
import { api as API } from '../../api/api'

export default {
  name: 'classification',
  data () {
    return {
      active: 1
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
    onClick (name, title) {
      console.log(name, title)
    }
  }

}
</script>

<style scoped>

</style>
