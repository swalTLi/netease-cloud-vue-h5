<template>
  <div>
    <div class="singerPage" v-if="songlist.playlists ||songlist.playLists">
      <ul>
        <li v-for="(item,index) in songlist.playlists || songlist.playLists"
            @click="clickSongList(item)"
            :key="index">
          <div class="left">
            <img :src="item.coverImgUrl" alt="">
            <span>{{ item.name }}</span>
          </div>
          <van-button
            @click="clickSongList(item)"
            size="mini"
            color="mediumseagreen"
            type="primary">
            查看歌单
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
  name: 'songList',
  data () {
    return {
      result: ''
    }
  },
  updated () {
  },
  mounted () {
  },
  methods: {
    clickSongList (item) {
      console.log(item)
      this.$router.push({
        name: 'songListInfo',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '歌单',
          // 专辑名称
          songListName: item.name,
          // 专辑id
          songListID: item.id,
          // 专辑背景
          songListBackgroundUrl: item.coverImgUrl,
          // 作者名称
          singerName: item.creator.nickname,
          // 作者id
          singerID: item.creator.id,
          // 作者img
          singerImage: item.creator.img1v1Url
        }
      })
    }
  },
  props: ['songlist'],
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
        width: 70%;
        display: flex;
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
          //white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
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
