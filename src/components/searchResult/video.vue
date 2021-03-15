<template>
  <div>
    <!--    点击跳转内容-->
    <div class="mains" v-if="videos.videos">
      <div class="box"
           v-for="(item,index) in videos.videos"
           @click="gotoInfiniteVideo(item)"
           :key="index">
        <img :src="item.coverUrl || item.imgurl16v9" alt="">
        <div class="info">
          <span>#{{ item.name || item.title }}</span>
        </div>
      </div>
    </div>
    <div v-if="videos.videos.length === 0">
      由于网易云接口权限问题,暂无数据,请尝试搜索其他关键词,或者浏览其他标签
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
  },
  mounted () {
    // console.log(this.videos.videos.length === 0)
    try {
      if (this.videos.videos.length % 2 === 1) {
        this.videos.videos.pop()
      }
      // console.log(window.sessionStorage.getItem('active'))
      if (window.sessionStorage.getItem('active') === '0') {
        document.querySelector('.mains').style.background = 'white'
        document.querySelectorAll('.box').forEach(item => {
          item.style.background = '#eaeaea'
        })
      }
      this.$forceUpdate()
    } catch (e) {
    }
  },
  methods: {
    gotoInfiniteVideo (item) {
      console.log(item)
      this.$router.push({
        name: 'infiniteVideo',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '视频',
          // 视频名称
          singleTitle: item.title,
          // 视频vid
          singleVID: item.vid,
          // 视频coverUrl
          singleCoverUrl: item.coverUrl,
          // 作者名称
          AuthorName: item.creator[0].userName,
          // 作者id
          AuthorID: item.creator[0].userId
        }
      })
    }
  },
  props: ['videos'],
  watch: {}
}
</script>

<style scoped lang="less">
.mains {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  //max-height: 83vh;
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
