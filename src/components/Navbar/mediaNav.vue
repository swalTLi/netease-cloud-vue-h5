<template>
  <div>
    <van-nav-bar>
      <template #left>
        <svg class="icon" aria-hidden="true" @click="goBack()">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </template>
      <template #title>
              <span v-if="show">{{title}}</span>
      </template>
      <template #right>
        <svg class="icon" aria-hidden="true" @click="more()">
          <use xlink:href="#icon-gengduo2"></use>
        </svg>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Bus from '../../common/Bus'

export default {
  name: 'mediaNav',
  data () {
    return {
      title: '',
      show: false
    }
  },
  props: ['isTrans'],
  mounted () {
    Bus.$on('vannavbar', res => {
      console.log(res)
      if (res) {
        console.log(document.getElementsByClassName('van-nav-bar'))
        document.getElementsByClassName('van-nav-bar')[0].style =
          'background:rgba(0,0,0,0)!important;transition:0.1s'
        this.show = false
      } else {
        console.log(document.getElementsByClassName('van-nav-bar'))
        document.getElementsByClassName('van-nav-bar')[0].style =
          'background:white!important;transition:0.1s'
        this.show = true
      }
    })
    this.$route.query.type ? this.title = '歌手详情' : this.title = '用户详情'
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    more () {

    }
  },
  watch: {}
}
</script>

<style scoped lang="less">

.icon {
  font-weight: 1000;
  font-size: 2rem;
}

[class*=van-hairline]::after {
  border: 0px;
}

.van-nav-bar {
  height: 6vh;
  background: rgba(0, 0, 0, 0);
}

.van-dialog {
  div {
    margin-top: 5vw;
    margin-bottom: 5vw;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center
  }
}
</style>
