<template>
  <div class="ss">
    <div class="videoBox" v-for="(item,index) in videoData" v-show="item.data.title" :key="index">
      <div class="videoTitle">
        <div class="authorIcon">
          <img :src="item.data.creator.avatarUrl" alt="" width="40vw">
        </div>
        <div class="titleInfo">
          <div class="top">
            <font size="0">
              {{ item.data.creator.nickname }}
              <button>关注</button>
            </font>
            <van-icon class="icon" name="more-o"/>
          </div>
          <div class="buttom">
            <span>
              {{ item.data.title }}
            </span>
          </div>
        </div>
      </div>
      <div class="video" v-if="item.data.creator">
        <!--        {{ item.vidUrl }}-->
        <picture v-show="!item.play">
          <source :srcset="item.data.previewUrl" type="image/webp">
          <source type="image/jpeg"
                  :srcset="item.data.coverUrl">
          <img src="img.jpg" width="100%" style="background: black;">
        </picture>
        <!--        -->
        <svg class="icon icon2"
             v-if="!item.play"
             @click="clickPlayBtn(item,index)">
          <use :xlink:href="'#icon-'+'bofang2'"></use>
        </svg>
        <video width="100%"
               :currentTime="item.currentTime"
               v-show="item.play"
               :ref="item.data.vid"
               :id="item.data.vid"
               :autoplay="item.play"
               :src="item.vidUrl"
               controls="controls">
          your browser does not support the video tag
        </video>
      </div>
      <div class="videoInfo"></div>
    </div>
  </div>
</template>

<script>
// import VideoBox from './videoBox'
import { api as API } from '../../api/api'

export default {
  name: 'browseContent',
  // components: { VideoBox },
  data () {
    return {
      start: true,
      url: '',
      lastVideoVid: '',
      nowVideoVid: '',
      lastIndex: ''
    }
  },
  created () {

  },
  beforeMount () {
    // this.videoData.forEach((item, index) => {
    //   this.videoData[index].play = false
    //   this.videoData[index].playing = ''
    //   this.videoData[index].vidUrl = '1'
    //   this.videoData[index].vid = item.data.vid
    // })
  },
  activated () {
    // console.log(1)
  },
  mounted () {
    // console.log(this.videoData)
    this.videoData.forEach((item, index) => {
      this.videoData[index].play = false
      this.videoData[index].playing = ''
      this.videoData[index].vidUrl = '1'
      this.videoData[index].currentTime = 0
      this.videoData[index].vid = item.data.vid
      document.getElementById(item.vid).addEventListener('pause', (event) => {
        this.videoData[index].play = false
      })
    })
  },
  methods: {
    svg2 (item, index) {
      console.log(item, index)
    },
    // 点击播放按钮
    clickPlayBtn (item, index) {
      // console.log(this.lastIndex)
      try {
        // 保存前一个视频的播放进度
        // console.log(this.videoData[this.lastIndex].vid)
        // 已经播放时长
        // console.log(document.getElementById(this.videoData[this.lastIndex].vid).currentTime)
        // if (this.lastIndex !== '') {
        //   // console.log(this.videoData[this.lastIndex].currentTime)
        //   this.videoData[this.lastIndex].currentTime = document.getElementById(this.videoData[this.lastIndex].vid).currentTime
        //   // console.log(this.videoData[this.lastIndex].currentTime)
        //   // console.log(this.videoData)
        //   // localStorage('setItem', this.list[name].name, this.videoData)
        // }
        // console.log(index)
        this.videoData.forEach((item, index) => {
          // 如果有在播放的音乐把他关闭
          // console.log(document.getElementById(item.vid))
          document.getElementById(item.vid).pause()
        })
      } catch (e) {
        console.log(e)
      }
      this.videoData[index].play = true
      this.nowVideoVid = this.videoData[index].data.vid
      this.$forceUpdate()
      API.video.get_video_url(this.videoData[index].data.vid).then(res => {
        this.$forceUpdate()
        this.videoData[index].vidUrl = res.data.urls[0].url
        // console.log(this.videoData[index].vidUrl)
        // 强制刷新数据
        // this.$forceUpdate()
        // 把上一个播放的视频id保存下来
        // console.log(this.videoData[index].vid)
        this.lastVideoVid = this.videoData[index].vid
        this.lastIndex = index
      })
      document.getElementById(item.vid).play()
    }
  },
  updated () {
  },
  props: ['videoData']

}
</script>

<style scoped lang="less">
.ss {
  background: #c3f6d8 !important;
  width: 100vw;
  height: 83vh;
  overflow-y: scroll;
  border-top: 2px solid seagreen;
  position: relative;

  .videoBox {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    width: 100vw;
    margin-top: 5px;

    .videoTitle {
      padding-top: 10px;
      width: 94%;
      min-height: 7vh;
      //background: rosybrown;
      margin-left: 3%;
      margin-right: 3%;
      display: flex;
      justify-content: space-between;

      .authorIcon {
        width: 13%;
        //background: aliceblue;

        img {
          border-radius: 50%;
        }
      }

      .titleInfo {
        width: 85%;

        .top {
          display: flex;
          justify-content: space-between;

          font, icon {
            color: #3b3b3b;
          }

          button {
            background: rgba(0, 0, 0, 0);
            border: 0px;
            color: #ffac0a;
          }
        }

        .buttom {
          line-height: 0.9 !important;

          span {
            font-size: 13px !important;
          }
        }
      }
    }

    .video {
      //background: rebeccapurple;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .icon {
        font-size: 50px;
        position: absolute;
      }

      picture {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100vw;
        position: relative;
        height: 56.25vw;
        overflow: hidden;

      }

      video {
        width: 100vw;
        height: 56.25vw;
        overflow: hidden;
        object-fit: cover;
      }

      .icon2 {
        font-size: 50px;
        position: absolute;
      }

    }

    .videoInfo {
      //background: #ff976a;
    }
  }

}
</style>
