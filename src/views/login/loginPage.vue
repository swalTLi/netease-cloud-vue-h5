<template>
  <div id="main">
    <van-nav-bar>
      <template #left>
        <van-icon name="cross" size="18" color="black" @click="back"/>
        <span style="margin-left: 10px;"  v-if="type==='Phone'">手机号登录</span>
        <span style="margin-left: 10px;"  v-if="type==='ExperienceNow'">立即体验</span>
        <span style="margin-left: 10px;"  v-if="type==='WeChat'">微信登录</span>
        <span style="margin-left: 10px;"  v-if="type==='QQ'">腾讯qq登录</span>
        <span style="margin-left: 10px;"  v-if="type==='SinaWeibo'">新浪微博登录</span>
        <span style="margin-left: 10px;"  v-if="type==='Netease'">网易邮箱登录</span>
      </template>
    </van-nav-bar>
    <transition name="fade">
      <phoneComp class="phoneComp" v-if="type==='Phone'"/>
    </transition>
  </div>
</template>
<script>
// 组件
import phoneComp from '@/components/login/phoneComp'

export default {
  name: 'loginPage',
  data () {
    return {
      type: ''
    }
  },
  mounted () {
    this.type = this.$route.fullPath.split('?')[1].split('=')[1]
    console.log(this.type)
  },
  methods: {
    back () {
      history.back()
    }
  },
  components: { phoneComp }
}
</script>

<style scoped lang="less">
#main{
  height: 100vh;
  width: 100vw;
}
.phoneComp{
  height: 50%;
  //background: #ddfaea;
  margin: 5vh 1vw;
}
</style>
