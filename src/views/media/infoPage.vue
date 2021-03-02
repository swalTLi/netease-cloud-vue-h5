<template>
  <div class="div">
    <media-nav></media-nav>
    <div id="background" @scroll.passive="getScroll($event)">
      <img class="backgroundUrl" v-if="backgroundUrl" :src="backgroundUrl" alt="" width="100%">
      <div class="main">
        <div class="info">
          <img class="userIcon" v-if="userIcon" :src="userIcon" alt="" width="30%">
          <div class="name">
            <font size="3" style="font-weight: bold;">
              {{ this.$route.query.nickname }}
            </font>
          </div>
          <div class="jies" v-if="this.param">
            <font size="1" v-if="this.param.artist">
              {{ this.param.artist.briefDesc }}
            </font>
          </div>
          <div class="nothing"></div>
        </div>
        <div class="tabs" v-if="songs">
          <van-tabs v-model="active" swipeable>
            <van-tab v-for="(item,index) in singerTabs" :title="item.title" :key="index">
              <div class="content">
                <!--                {{ item.title }}-->
                <div v-if="active===0">
                  <single v-if="songs" :singles="songs"/>
                </div>
                <div v-if="active===1">
                  <Album v-if="albums" :album="albums"/>
                </div>
                <div v-if="active===2">
                  <Video v-if="videos" :videos="videos"/>
                </div>
              </div>
              <div class="nothing"></div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaNav from '../../components/Navbar/mediaNav'
import { api as API } from '../../api/api'
import { localStorage } from '../../common/localStorage'
import Single from '../../components/searchResult/single'
import Album from '../../components/searchResult/Album'
import Video from '../../components/searchResult/video'
import Bus from '../../common/Bus'

export default {
  name: 'infoPage',
  components: { Video, Album, Single, MediaNav },
  data () {
    return {
      time: '',
      active: 0,
      param: {},
      // 背景
      backgroundUrl: '',
      // 头像
      userIcon: '',
      // 歌手标签
      singerTabs: [
        {
          title: '歌曲'
        },
        {
          title: '专辑'
        },
        {
          title: 'MV'
        }
      ],
      // 用户标签
      userTabs: [
        {
          title: '歌单'
        },
        {
          title: '专辑'
        },
        {
          title: 'MV'
        }
      ],
      // 歌曲
      songs: {},
      //  专辑
      albums: {},
      // 视频
      videos: {},
      scale: 1
    }
  },
  mounted () {
    this.time = new Date().getTime()
    console.log(this.time)
    console.log(this.$route.query)
    // console.log(this.$route.params.data)
    this.$route.query.type === 0
      ? this.userStart(this.$route.query.nickname, this.$route.query.id)
      : this.singerStart(this.$route.query.nickname, this.$route.query.id)
    this.time = new Date().getTime()
    console.log(this.time)
  },
  methods: {
    getScroll (event) {
      // 滚动条距离底部的距离scrollBottom
      // eslint-disable-next-line no-unused-vars
      const scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight
      if (event.target.scrollTop > 190 && event.target.scrollTop < 210) {
        if (event.target.scrollTop > 200) {
          Bus.$emit('vannavbar', 0)
          // this.scale -= 0.01
          // if (this.scale < 1) {
          //   this.scale = 1
          // }
          // document.getElementsByClassName('backgroundUrl')[0].style =
          //   'width:' + 100 * this.scale + 'vw;'
          // 'transform:scale(' + this.scale + ');transition:0.1s'
        } else {
          Bus.$emit('vannavbar', 1)
          // this.scale += 0.05
          // document.getElementsByClassName('backgroundUrl')[0].style =
          //   'width:' + 100 * this.scale + 'vw'
          // 'transform:scale(' + this.scale + ');transition:0.1s'
        }
      }
      // console.log(event.target.scrollTop)
    },
    userStart () {
      console.log('user')
      this.backgroundUrl = this.$route.query.backgroundUrl
      this.userIcon = this.$route.query.avatarUrl
    },
    singerStart (name, id) {
      console.log('singer')
      this.backgroundUrl = this.$route.query.img1v1Url
      this.userIcon = false
      // 获取明星详细信息
      this.getData(name, id)
      console.log('param', this.param)
      //  获取歌手的歌曲
      this.getMusic(name, id)
      console.log('songs', this.songs)
      //  获取歌手专辑
      this.getAlbum(name, id)
      console.log('albums', this.albums)
      // 获取个歌手MV
      this.getVideo(name, id)
      console.log('videos', this.videos)
    },
    getData (nickname, id) {
      // 优先加载缓存
      if (!localStorage('getItem', nickname)) {
        API.media.getSingerDetail(id).then(res => {
          localStorage('setItem', nickname, res.data.data, 10000 * 60 * 10)
          this.param = res.data.data
          this.$forceUpdate()
        })
      } else {
        this.param = localStorage('getItem', nickname)
        this.$forceUpdate()
      }
    },
    getMusic (name, id) {
      // 优先加载缓存
      if (!localStorage('getItem', name + 'songs')) {
        API.media.getSingersMusics(id).then(res => {
          localStorage('setItem', name + 'songs', res.data, 10000 * 60 * 10)
          this.songs = localStorage('getItem', name + 'songs')
          this.$forceUpdate()
        })
      } else {
        this.songs = localStorage('getItem', name + 'songs')
        this.$forceUpdate()
      }
    },
    getAlbum (name, id) {
      // 优先加载缓存
      if (!localStorage('getItem', name + 'albums')) {
        API.media.getSingerAlbum(id).then(res => {
          console.log(res)
          localStorage('setItem', name + 'albums', res.data, 10000 * 60 * 10)
          // this.albums = localStorage('getItem', name + 'albums')
          this.$forceUpdate()
        })
      } else {
        // this.albums = localStorage('getItem', name + 'albums')
        this.$forceUpdate()
      }
      this.albums = {
        albums: localStorage('getItem', name + 'albums').hotAlbums
      }
    },
    getVideo (name, id) {
      // 优先加载缓存
      if (!localStorage('getItem', name + 'videos')) {
        API.media.getSingerMV(id).then(res => {
          localStorage('setItem', name + 'videos', res.data.mvs, 10000 * 60 * 10)
          // this.videos = {
          //   videos: localStorage('getItem', name + 'videos')
          // }
          this.$forceUpdate()
        })
      } else {
        // this.videos = {
        //   videos: localStorage('getItem', name + 'videos')
        // }
        this.$forceUpdate()
      }

      this.videos = {
        videos: localStorage('getItem', name + 'videos')
      }
    }
  },
  watch: {
    'window.screenTop' (newV, oldV) {
      console.log(newV)
    }
  }
}
</script>

<style scoped lang="less">
.nothing {
  width: 100%;
  height: 5vw;
}

#background {
  top: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: #d5d5d5;
  overflow: hidden;
  overflow-y: auto;
display: flex;
  justify-content: center;
  .backgroundUrl {
    width: 100vw;
    height: 100vw;
    overflow: hidden;
    position: absolute;
    object-fit: cover;
  }

  .main {
    width: 100%;
    margin-top: 100vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: absolute;

    .info {
      margin-top: -10vw;
      width: 95vw;
      background: white;
      opacity: 0.9;
      border-radius: 3vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .userIcon {
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        border: 2px solid white;
        z-index: 999;
        object-fit: cover;
      }

      .name {
        margin-top: 5vw;
      }

      .jies {
        width: 80%;
        margin-top: 5vw;
      }

    }

    .tabs {
      margin-top: 5vw;
      width: 95%;

      /deep/ .van-tabs__nav {
        background: rgba(0, 0, 0, 0) !important;
      }

      .content {
        border-radius: 3vw;
        background: white;
        padding: 3vw;
      }
    }
  }
}
</style>
