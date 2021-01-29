<template>
  <div>
    <NavBar/>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <TabBar/>
  </div>
</template>
<script>
// 组件
import TabBar from '@/components/TabBar'
import NavBar from '@/components/Navbar'

export default {
  name: 'Little_evil_fish_music',
  data () {
    return {
      path: ''
    }
  },
  components: { TabBar, NavBar },
  created () {

  },
  mounted () {

  },
  methods: {}
}
</script>
<style scoped lang="less">
</style>
