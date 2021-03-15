<template>
  <div>
    <div class="singlePage" v-if="singles.songs">
      <div class="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <span>播放全部</span>
      </div>
      <div class="lists">
        <ul>
          <li v-for="(item,index) in singles.songs" :key="index" @click="gotoMusicPlayPage(item)">
            <div>
              <div class="top">
              <span v-if="item.name">
                 {{ item.name }}
              </span>
              </div>
              <div class="bot">
              <span v-if="item.album">
                  {{ item.album.name }}
              </span>
               <span v-if="item.album && item.artists">/</span>
                <span v-if="item.artists">
                {{ item.artists[0].name }}
              </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      由于网易云接口权限问题,暂无数据,请尝试搜索其他关键词,或者浏览其他标签
    </div>
  </div>
</template>

<script>

export default {
  name: 'single',
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
    gotoMusicPlayPage (item) {
      // console.log(item)
      this.$router.push({
        name: 'MusicPlaying',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '单曲',
          // 歌曲名称
          singleName: item.name,
          // 歌曲id
          singleID: item.id,
          // 歌曲img
          singleImg: false,
          // 歌曲背景
          singleBackground: item.al.picUrl,
          // 作者名称
          AuthorName: item.ar[0].name,
          // 作者id
          AuthorID: item.ar[0].id
        }
      })
    }
  },
  props: ['singles'],
  watch: {
  },
  errorCaptured (err, vm, info) {
    console.log(`cat EC: ${err.toString()}\ninfo: ${info}`)
    return false
  }
}
</script>
<style scoped lang="less">
.singlePage {
  width: 100%;
  //max-height: 83vh;
  //background: sienna;
  overflow-y: scroll;
  overflow-x:hidden;

  .playAll {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: start;
    align-items: center;
    align-content: center;

    .icon {
      font-size: 1.8rem;
      margin: 0 3%;
    }

    span {
      font-size: 17px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .playAll:active {
    background: #d7d7d7;
  }

  .lists {
    width: 100%;

    ul {

      li {
        height: 8vh;
        width: 94%;
        padding: 0 4%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;

        .top {
          width: 94vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
        }

        .bot {
          color: darkgrey;
          font-size: 12px;
        }
      }

      li:active {
        background: #d7d7d7;
      }
    }
  }
}
</style>
