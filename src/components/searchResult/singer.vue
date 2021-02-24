<template>
  <div>
    <div class="singerPage" v-if="singers.artists[0]">
      <ul>
        <li v-for="(item,index) in singers.artists"
            :key="index"
            @click="lookSingerInfo(item)">
          <div class="left">
            <img :src="item.img1v1Url" alt="">
            <span>{{ item.name }}</span>
          </div>
          <van-button size="mini"
                      color="mediumseagreen"
                      @click.stop="lookSingerInfo(item)"
                      type="primary">
            查看歌手
          </van-button>
        </li>
      </ul>
    </div>
    <div v-else>
      由于网易云接口权限问题,暂无数据,请尝试搜索其他关键词,或者浏览其他标签
    </div>
  </div>
</template>

<script>

export default {
  name: 'singer',
  data () {
    return {
      result: ''
    }
  },
  updated () {
    // console.log(this.singers)
  },
  mounted () {
    // console.log(this.singers)
  },
  methods: {
    lookSingerInfo (item) {
      console.log(item)
    }
  },
  props: ['singers'],
  watch: {}
}
</script>
<style scoped lang="less">
.singerPage {
  width: 100%;
  max-height: 83vh;
  //background: sienna;
  overflow-y: scroll;
  overflow-x: hidden;

  ul {
    display: flex;
    flex-wrap: wrap;

    li:active {
      background: #d7d7d7;
    }

    li {
      margin-top: 1vh;
      width: 94vw;
      padding: 10px 3%;
      height: 8vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;

      .left {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        align-content: center;

        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }

        span {
          padding-left: 1rem;
          font-size: 13px;
        }
      }

      .van-button {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
      }
    }
  }
}
</style>
