<template>
  <div class="ss">
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
      <div class="video">
        <picture v-if="start">
          <source :srcset="item.data.previewUrl" type="image/webp">
          <source :srcset="item.data.coverUrl" type="image/jpeg">
          <img src="img.jpg" width="100%" style="background: black;">
        </picture>
        <video :src="item" controls="controls">
          your browser does not support the video tag
        </video>
      </div>
      <div class="videoInfo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'browseContent',
  data () {
    return {
      start: true
    }
  },
  mounted () {
    console.log(this.videoData)
  },
  methods: {},
  props: ['videoData']
}
</script>

<style scoped lang="less">
.ss {
  background: #fff;
  width: 100vw;
  height: 83vh;
  overflow-y: scroll;
  border-top: 2px solid seagreen;

  .videoBox {
    width: 100vw;
    //height: 30vh;
    //background: seagreen;
    margin-top: 5px;

    .videoTitle {
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
    }

    .videoInfo {
      //background: #ff976a;
    }
  }
}
</style>
