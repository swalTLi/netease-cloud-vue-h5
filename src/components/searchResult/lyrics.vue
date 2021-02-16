<template>
  <div>
    <div class="singerPage" v-if="lyrics.songs">
      <ul>
        <li v-for="(item,index) in lyrics.songs" :key="index">
          <div class="left">
            <img :src="item.artists[0].img1v1Url" alt="">
            <div class="main">
              <span>{{ item.name }}</span>
              <span>{{ item.artists[0].name }}</span>
            </div>
          </div>
          <van-button
            size="mini"
            color="mediumseagreen"
            type="primary">
            完整歌词
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
  name: 'Lyrics',
  data () {
    return {
      result: ''
    }
  },
  updated () {
    console.log(this.lyrics)
  },
  mounted () {
    console.log(this.lyrics)
  },
  methods: {
  },
  props: ['lyrics'],
  watch: {
  }
}
</script>
<style scoped lang="less">
.singerPage {
  width: 100%;
  height: 83vh;
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
      padding: 0 3%;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 70%;

        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }

        div {
          padding-left: 1rem;
          font-size: 13px;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .main {
          width: 70%;
          span{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
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
