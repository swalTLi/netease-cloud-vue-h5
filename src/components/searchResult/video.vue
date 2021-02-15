<template>
  <div>
<!--    点击跳转抖音内容-->
    <div class="mains">
      <div class="box"
           v-for="(item,index) in videos.videos"
           :key="index">
        <img :src="item.coverUrl" alt="">
        <div class="info">
          <span>{{ '#' + item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'videos',
  data () {
    return {
      video: {
        hasMore: '',
        songCount: '',
        songs: []
      }
    }
  },
  updated () {
    if (this.videos.videos.length % 2 === 1) {
      this.videos.videos.length = this.videos.videos.length - 1
    }
  },
  mounted () {
    try {
      if (this.videos.videos.length % 2 === 1) {
        this.videos.videos.length = this.videos.videos.length - 1
      }
      if (window.sessionStorage.getItem('active') === '0') {
        document.querySelector('.mains').style.background = 'white'
        document.querySelectorAll('.box').forEach(item => {
          item.style.background = '#eaeaea'
        })
      }
      // console.log(this.videos.videos.length)
      this.$forceUpdate()
    } catch (e) {

    }
  },
  methods: {},
  props: ['videos'],
  watch: {}
}
</script>

<style scoped lang="less">
.mains{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 83vh;
  margin: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #eaeaea;
  .box {
    background: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    margin-top: 5vw;
    width: 47%;
    //height: 65vw;
    font-size: 14px;
    border-radius: 2vw;

    img {
      border-top-left-radius: 2vw;
      border-top-right-radius: 2vw;
      width: 100%;
      height: 50vw;
      object-fit: cover;
    }

    .info {
      width: 47vw;
      height: 15vw;
      margin: auto;
      margin-top: 3vw;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        font-size: 12px;
        display: inline-block;
        width: 95%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
