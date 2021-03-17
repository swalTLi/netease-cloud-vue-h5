<template>
  <div>
    <!--  精选音乐视频-->
    <!--  精选音乐视频-->
    <!--  精选音乐视频-->
    <div class="home-page-music-mlog" v-if="data.blockCode ==='HOMEPAGE_MUSIC_MLOG'">
      <transition name="fade">
        <div class="title">
          <div class="left" v-if="data.uiElement">
            <span>
              {{ data.uiElement.subTitle.title }}
            </span>
          </div>
          <div class="right" v-if="data.uiElement">
            <van-button
              size="mini"
              round
            >
                <span>
              {{ data.uiElement.button.text }}<van-icon name="arrow"/></span>
            </van-button>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="main-box">
          <van-swipe class="my-swipe" :width="160" :show-indicators="false" :loop="false">
            <van-swipe-item class="for" v-for="(box,index) in data.extInfo" :key="index" v-show="box.resource.mlogExtVO.song" @click="goLink(box)">
              <font size="1" class="play-number" v-if="box.resource.mlogExtVO.playCount">
                {{
                  box.resource.mlogExtVO.playCount > 10000 ?
                    box.resource.mlogExtVO.playCount > 100000000 ?
                      (box.resource.mlogExtVO.playCount / 100000000).toString().split('.')[0] + "亿+" :
                      (box.resource.mlogExtVO.playCount / 10000).toString().split('.')[0] + "万+" :
                    box.resource.mlogExtVO.playCount
                }}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang1"></use>
                  <video src="nowVideo"></video>
                </svg>
              </font>
              <div class="bofang">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang2"></use>
                </svg>
              </div>
              <img class="HOMEPAGE_MUSIC_MLOG-img" v-if="box.resource.mlogExtVO.song"  :src="box.resource.mlogExtVO.song.coverUrl" alt="">
              <div class="playlist-name">
                <font size="1">{{ box.resource.mlogBaseData.text }}</font>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HOMEPAGE_MUSIC_MLOG',
  date () {
    return {
      data: this.data,
      nowVideo: ''// 当前 mp3音乐视频播放地址
    }
  },
  mounted () {
    // console.log(this.data.blockCode, this.data)
  },
  methods: {
    goLink (item) {
      console.log(item)
      // console.log(item.resources[0].resourceUrl.split('/').pop())
      this.$router.push({
        name: 'MusicPlaying',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '单曲',
          // 歌曲名称
          singleName: item.resource.mlogExtVO.song.name,
          // 歌曲id
          singleID: item.resource.mlogExtVO.song.id,
          // 歌曲img
          singleImg: false,
          // 歌曲背景
          singleBackground: item.resource.mlogBaseData.coverUrl,
          // 作者名称
          AuthorName: item.resource.mlogExtVO.song.artists[0].artistName,
          // 作者id
          AuthorID: item.resource.mlogExtVO.song.artists[0].artistId
        }
      })
    }
  },
  props: ['data']
}
</script>
<style scoped lang="less">
.HOMEPAGE_MUSIC_MLOG-img {
  width: 40vw !important;
  height: 50vw !important;
}

.bofang {
  position: absolute;
  font-size: 2rem !important;
  bottom: 8vw;
  right: 5vw;
}
.main-box {
  .my-swipe {
    width: 100% !important;
    overflow-y: scroll!important;
    .van-swipe-item {
      display: flex;
      flex-wrap: wrap;
      margin: 0 0% !important;
      img {
        width: 29vw;
        height: 29vw;
        border-radius: 8%;
      }
    }
    .for:first-child {
      margin-left: 1% !important;
    }

    .for:last-child {
      padding-right: 1% !important;
    }
  }
}

</style>
