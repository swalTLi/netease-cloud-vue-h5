<template>
  <div>
    <div class="singerPage" v-if="album.albums">
      <ul>
        <li v-for="(item,index) in album.albums" :key="index" @click="clickAlbum(item)">
          <img :src="item.picUrl" alt="">
          <div class="left">
            <span>{{ item.name }}</span>
            <span>{{ item.artists[0].name }}</span>
          </div>
          <van-button
            size="mini"
            color="mediumseagreen"
            type="primary">
            播放专辑
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
  name: 'Album',
  data () {
    return {
      result: '',
      err: ''
    }
  },
  updated () {
  },
  mounted () {
    // console.log(this.album)
  },
  methods: {

    clickAlbum (item) {
      console.log(item)
      this.$router.push({
        name: 'AlbumInfo',
        params: {
          data: item
        },
        query: {
          type: '0',
          typeInfo: '专辑',
          // 专辑名称
          albumName: item.name,
          // 专辑id
          albumID: item.id,
          // 专辑背景
          albumBackgroundUrl: item.picUrl,
          // 作者名称
          singerName: item.artists[0].name,
          // 作者id
          singerID: item.artists[0].id,
          // 作者img
          singerImage: item.artists[0].img1v1Url
        }
      })
    }
  },
  props: ['album'],
  watch: {}
}
</script>
<style scoped lang="less">
.singerPage {
  width: 100%;
  //max-height: 83vh;
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

      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }

      .left {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        align-content: center;
        width: 65%;

        span {
          padding-left: 1rem;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .van-button {
        width: 22%;
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
