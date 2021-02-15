<template>
  <div class="synthesis">
    <div class="single" v-if="synthesis.song">
      <div class="title">
        单曲
      </div>
      <single v-if="synthesis.song" :singles="synthesis.song"/>
    </div>
    <div class="video" v-if="synthesis.video">
      <div class="title">
        歌单
      </div>
      <videos v-if="synthesis.video" :videos="synthesis.video"/>
    </div>
    <div class="album" v-if="synthesis.video">
      <div class="title">
        专辑
      </div>
      <album v-if="synthesis.album" :album="synthesis.album"/>
    </div>

    <div class="artist" v-if="synthesis.artist">
      <div class="title">
        歌手
      </div>
      <singer v-if="synthesis.artist" :singers="synthesis.artist"/>
    </div>
    <div class="user" v-if="synthesis.user">
      <div class="title">
        用户
      </div>
      <user v-if="synthesis.user" :user="synthesis.user"/>
    </div>

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

export default {
  name: 'synthesis',
  components: { User, Singer, Album, Videos, Single },
  data () {
    return {}
  },
  updated () {
    console.log(this.synthesis)
  },
  mounted () {
    console.log(this.synthesis.user)
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

  .single, .video, .album, .artist, .user {
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
    height: 120vw;
    background: white;
  }

  .video {
    height: 165vw;
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
}
</style>
