<template>
  <div class="synthesis">
    <transition name="fade">
      <div class="single" v-if="synthesis.song">
        <div class="title">
          单曲
        </div>
        <single v-if="synthesis.song" :singles="synthesis.song" :key="time"/>
      </div>
    </transition>
    <transition name="fade">
      <div class="video" v-if="synthesis.video">
        <div class="title">
          视频
        </div>
        <videos v-if="synthesis.video" :videos="synthesis.video" :key="time"/>
      </div>
    </transition>
    <transition name="fade">
      <div class="album" v-if="synthesis.album">
        <div class="title">
          专辑
        </div>
        <album v-if="synthesis.album" :album="synthesis.album"/>
      </div>
    </transition>
    <transition name="fade">
      <div class="playList" v-if="synthesis.playList">
        <div class="title">
          歌单
        </div>
        <song-list v-if="synthesis.playList" :songlist="synthesis.playList"/>
      </div>
    </transition>
    <transition name="fade">
      <div class="artist" v-if="synthesis.artist">
        <div class="title">
          歌手
        </div>
        <singer v-if="synthesis.artist" :singers="synthesis.artist"/>
      </div>
    </transition>
    <transition name="fade">
      <div class="user" v-if="synthesis.user">
        <div class="title">
          用户
        </div>
        <user v-if="synthesis.user" :user="synthesis.user"/>
      </div>

    </transition>
    <div style="width: 100vw;height: 10vw"></div>
  </div>
</template>

<script>
// 组件
import Single from '@/components/searchResult/single'
import Videos from '@/components/searchResult/video'
import Album from '@/components/searchResult/Album'
import Singer from '@/components/searchResult/singer'
import User from '@/components/searchResult/user'
import SongList from '@/components/searchResult/songList'

export default {
  name: 'synthesis',
  components: { SongList, User, Singer, Album, Videos, Single },
  data () {
    return {
      time: ''
    }
  },
  updated () {
  },
  mounted () {
    var data = new Date()
    this.$nextTick(() => {
      // 在 DOM 中添加 my-component 组件
      // video
      if (this.synthesis.video.videos.length % 2 === 1) {
        this.synthesis.video.videos.length = this.synthesis.video.videos.length - 1
        this.time = data.getTime()
        this.$forceUpdate()
      }
      // 单曲
      this.synthesis.song.songs.length = 5
      this.time = data.getTime()
    })
  },
  methods: {},
  props: ['synthesis'],
  watch: {
    Synthesis (newV, oldV) {

    }
  }
}
</script>

<style scoped lang="less">
.synthesis {
  width: 100%;
  max-height: 83vh;
  margin: auto;
  background: #dcdcdc;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: scroll;

  .single, .video, .album, .artist, .user, .playList {
    margin-top: 3vw;
    width: 94%;
    overflow: hidden;
    border-radius: 2vw;

    .title {
      margin: auto;
      width: 94%;
      line-height: 15vw;
      border-bottom: 1px solid #e3e3e3;
      font-size: 20px;
      font-weight: bolder;
    }
  }

  .single {
    max-height: 120vw;
    background: white;
  }

  .video {
    //height: 165vw;
    padding-bottom: 5vw;
    background: white;
  }

  .album {
    background: white;
  }

  .artist {
    background: white;
  }

  .user {
    background: white;
  }

  .playList {
    background: white;
  }
}
</style>
