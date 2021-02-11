<template>
  <div>
    <!--  音乐日历-->
    <!--  音乐日历-->
    <!--  音乐日历-->
    <div class="home-page-music-calendar" v-if="data.blockCode ==='HOMEPAGE_MUSIC_CALENDAR'">
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
      <div class="main-box">
        <div class="text">
          <div class="fors" v-for="(item,index) in data.creatives" :key="index">
            <div class="left">
              <div class="top">
                <span class="day">
                  {{
                    new Date().getTime() > item.resources[0].resourceExtInfo.startTime ?
                      item.resources[0].resourceExtInfo.endTime > new Date().getTime() ?
                        "今天" : "明天" : "昨天"
                  }}
                  <van-tag type="warning" v-if="item.resources[0].resourceExtInfo.eventType==='OPERATOR_FORCE'">
                    {{ item.resources[0].resourceExtInfo.tags[0] }}
                  </van-tag>
                  <van-tag type="primary" v-if="item.resources[0].resourceExtInfo.eventType === 'REP_TRAILER' ">
                    预告
                  </van-tag>
                </span>
              </div>
              <div class="bottom"></div>
              <span class="bottom">
              {{ item.resources[0].uiElement.mainTitle.title }}
              </span>
            </div>
            <div class="right">
              <img src="" alt="">
              <img :src="item.resources[0].uiElement.image.imageUrl" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HOMEPAGE_MUSIC_CALENDAR',
  date () {
    return {
      data: this.data,
      nowVideo: '' // 当前 mp3音乐视频播放地址,
    }
  },
  mounted () {
    // console.log(this.data.blockCode, this.data)
  },
  methods: {},
  props: ['data']
}
</script>
<style scoped lang="less">
.main-box {
  .text {
    margin: 0 3%;
    width: 100vw;

    .fors {
      display: flex;
      justify-content: space-between;

      .left {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;

        .top {
          width: 100%;

          .day {
            font-size: 0.1rem;
            color: grey;
          }

          .van-tag {
            font-size: 0.2rem;
            color: white;
          }
        }

        .bottom {
          width: 100%;
          font-size: 0.9rem;
        }
      }

      .right {
        width: 20%;
        background: aliceblue;
        display: flex;
        justify-content: space-between;

        img {
          width: 17vw;
          border-radius: 10%;
        }
      }
    }

    .fors:nth-child(2) {
      margin-top: 2vw;
    }
  }
}

</style>
