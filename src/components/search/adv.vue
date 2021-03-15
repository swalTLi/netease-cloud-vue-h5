<template>
  <div class="img">
    <img :src="showImg" v-if="showImg" alt="">
    <img :src="img404" v-if="!showImg" alt="">
  </div>
</template>
<script>
export default {
  name: 'adv',
  data () {
    return {
      img404: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3136626573,2216251976&fm=26&gp=0.jpg',
      showImg: '',
      inteval: ''
    }
  },
  props: ['bannerData'],
  mounted () {
    try {
      this.showImg = this.bannerData[0]
      this.changeAdvertisement()
    } catch (e) {
    }
  },
  methods: {
    changeAdvertisement () {
      var i = 0
      this.inteval = setInterval(() => {
        this.showImg = this.bannerData[i]
        if (i <= this.bannerData.length - 1) {
          i++
        } else {
          i = 0
        }
      }, 15000)
    }
  }
}
</script>

<style scoped lang="less">
.img {
  width: 100vw;
  height: 17vw;
  display: flex;
  justify-content: center;
  padding-top: 2%;

  img {
    width: 94vw;
    height: 100%;
    object-fit: cover;
    border-radius: 1.5vw;
    box-shadow: 1px 1px 3px whitesmoke;
  }
}
</style>
