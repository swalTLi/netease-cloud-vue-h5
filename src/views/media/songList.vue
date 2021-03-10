<template>
  <div>
    <media-nav :isTrans="true"/>
    <div class="mainInfo">
      <img class="img" :src="this.$route.query.songListBackgroundUrl"
           alt="">
      <div class="info">
        <div class="left">
          <!--img-->
          <div class="crycle"></div>
          <img :src="this.$route.query.songListBackgroundUrl" alt="">
        </div>
        <div class="right">
          <!--info-->
          <div>{{ this.$route.query.songListName }}</div>
          <div>{{ this.$route.query.singerName }}</div>
          <!--          <div v-if="this.albumData.album">{{ this.albumData.album.description }}</div>-->
        </div>
      </div>
    </div>
    <div class="songlist">
      <single :singles="songLists"/>
    </div>
  </div>
</template>

<script>
import MediaNav from '@/components/Navbar/mediaNav'
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'
import Single from '@/components/searchResult/single'

export default {
  name: 'songList',
  components: { Single, MediaNav },
  data () {
    return {
      albumData: false,
      songLists: false
    }
  },
  mounted () {
    console.log(this.$route.params)
    console.log(this.$route.query)
    this.start()
  },
  methods: {
    start () {
      console.log(this.$route.params)
      console.log(this.$route.query)
      console.log(this.$route.query.songListID)
      //  初始化
      if (!localStorage('getItem', 'albumID' + this.$route.query.songListID)) {
        API.media.getSongListContentById(this.$route.query.songListID).then(res => {
          console.log(res.data)
          localStorage('setItem', 'albumID' + this.$route.query.songListID, res.data)
          this.albumData = localStorage('getItem', 'albumID' + this.$route.query.songListID)
          this.songLists = {
            songs: this.albumData.playlist.tracks
          }
        })
      } else {
        this.albumData = localStorage('getItem', 'albumID' + this.$route.query.songListID)
        this.songLists = {
          songs: this.albumData.playlist.tracks
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.mainInfo {
  width: 100vw;
  height: 50vw;
  position: relative;
  top: -13vw;
  display: flex;
  justify-content: center;
  -webkit-filter: contrast(60%); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */

  .img {
    width: 100vw;
    height: 70vw;
    object-fit: cover;
    //filter: contrast(50%);
    filter: blur(5px);
  }

  .info {
    width: 92vw;
    top: 10vh;
    position: absolute;
    display: flex;
    justify-content: space-between;

    .left {
      width: 30vw;
      height: 30vw;
      //background: sienna;
      display: flex;
      justify-content: center;

      .crycle {
        position: absolute;
        width: 28vw;
        height: 20vw;
        background: black;
        border-radius: 100%;
        border: 1px solid white;
        top: -5vw;
      }

      img {
        border-radius: 10%;
        border: 1px solid white;
        width: 100%;
        height: 100%;
        z-index: 100;
      }
    }

    .right {
      width: 50vw;
      height: 30vw;
      //border: 1px solid white;
      div {
        width: 60vw;
        height: 5vw;
        padding-top: 5px;
      }

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: center;

    }
  }
}

.songlist {
  right: 4vw;
  position: absolute;
  width: 92vw;
  height: 100px;
  background: white;
  z-index: 999;
  border-radius: 10px;
  opacity: 0.8;
}
</style>
