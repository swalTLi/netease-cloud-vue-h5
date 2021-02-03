<template>
  <div class="ss" v-if="videoData!==1">
    <!--  {{videoData}}-->
    <div class="videoBox" v-for="(item,index) in videoData" :key="index">
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
        {{item.vidUrl}}
        <picture v-show="!item.play">
          <source :srcset="item.data.previewUrl" type="image/webp">
          <svg class="icon" aria-hidden="true"
               @click="clickPlayBtn(item,index)">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <source type="image/jpeg"
                  :srcset="item.data.coverUrl" >
          <img src="img.jpg" width="100%" style="background: black;">
        </picture>
        <!--        <video-box v-if="!start" :vid="item.data.vid"/>-->
        <video width="100%"
               v-show="item.play"
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
      url: ''
    }
  },
  created () {
    this.videoData.forEach((item, index) => {
      this.videoData[index].play = false
      this.videoData[index].vidUrl = '1'
    })
  },
  mounted () {
    console.log(this.videoData)
  },
  methods: {
    // 点击播放按钮
    clickPlayBtn (item, index) {
      console.log(this.videoData[index], index)
      this.videoData[index].play = true
      API.video.get_video_url(this.videoData[index].data.vid).then(res => {
        // this.url = res.data.urls[0].url
        this.videoData[index].vidUrl = res.data.urls[0].url
        console.log(this.videoData[index].vidUrl)
        // 强制刷新数据
        this.$forceUpdate()
      })
    }
  },
  updated () {
    console.log(1)
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

  .videoBox {
    background: #fff;
    width: 100vw;
    //height: 30vh;
    //background: seagreen;
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
      picture {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100vw;
        position: relative;
        height:56.25vw ;
        .icon {
          font-size: 50px;
          position: absolute;
        }
      }

    }

    .videoInfo {
      //background: #ff976a;
    }
  }

}
</style>
