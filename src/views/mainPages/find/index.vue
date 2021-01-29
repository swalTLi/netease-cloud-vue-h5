<template>
  <transition name="fade">
    <div id="main" v-if="transition">
      <div class="page">
        <div class="banner">
          <transition name="fade">
            <van-swipe :autoplay="3000" v-if="transition">
              <van-swipe-item
                v-for="(item, index) in banners"
                :key="index"
                :show-indicators="false"
              >
                <img alt="" class="img" v-lazy="item.imageUrl" :src="item.imageUrl"/>
              </van-swipe-item>
            </van-swipe>
          </transition>
        </div>
        <transition name="fade">
          <div class="home-page-icon" v-if="transition">
            <div class="for" v-for="(item, index) in homePageIcon" :key="index">
              <img :src="item.iconUrl" alt=""/>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </transition>
        <div v-for="(item, index) in blocks" :key="index">
          <!--        推荐歌单-->
          <HOMEPAGE_BLOCK_PLAYLIST_RCMD
            :data="item"
            v-if="rule[item.blockCode]"
          />
          <!--         私人定制-->
          <HOMEPAGE_BLOCK_STYLE_RCMD
            :data="item"
            v-if="item.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD'"
          />
          <!--         精彩音乐视频-->
          <HOMEPAGE_MUSIC_MLOG
            :data="item"
            v-if="item.blockCode === 'HOMEPAGE_MUSIC_MLOG'"
          />
          <!--         音乐日历-->
          <HOMEPAGE_MUSIC_CALENDAR
            :data="item"
            v-if="item.blockCode === 'HOMEPAGE_MUSIC_CALENDAR'"
          />
          <!--          专属场景歌单-->
          <!--          新歌-->
          <!--          专属场景歌单-->
          <!--          专属场景歌单-->
          <!--          专属场景歌单-->
        </div>
        <more></more>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'
import { ruleFindPageUiElement } from '@/common/rules'
// 组件
// import NavBar from '@/components/Navbar'
import HOMEPAGE_BLOCK_STYLE_RCMD from '@/components/find/HOMEPAGE_BLOCK_STYLE_RCMD'
import HOMEPAGE_BLOCK_PLAYLIST_RCMD from '@/components/find/HOMEPAGE_BLOCK_PLAYLIST_RCMD'
import HOMEPAGE_MUSIC_MLOG from '@/components/find/HOMEPAGE_MUSIC_MLOG'
import HOMEPAGE_MUSIC_CALENDAR from '@/components/find/HOMEPAGE_MUSIC_CALENDAR'
import more from '@/components/find/more'

Vue.use(Lazyload)
export default {
  name: 'index',
  data () {
    return {
      blocks: '',
      banners: '', // 详细的 banner 图
      homePageIcon: '', // 首页导航图表按钮数据
      homePageData: '', // 首页发现数据
      recommendedSongList: '', // 推荐歌单
      personalTailor: '', // 私人定制
      transition: false,
      rule: ruleFindPageUiElement,
      path: ''
    }
  },
  components: {
    // NavBar,
    HOMEPAGE_BLOCK_STYLE_RCMD,
    HOMEPAGE_BLOCK_PLAYLIST_RCMD,
    HOMEPAGE_MUSIC_MLOG,
    HOMEPAGE_MUSIC_CALENDAR,
    more

  },
  created () {
    setTimeout(() => {
      this.transition = true
    })
  },
  mounted () {
    this.findBanners()
    this.findHomepageData()
    this.findHomePageIcon()
  },
  methods: {
    // 详细的 banner 图数据
    findBanners () {
      // 优先加载缓存
      if (!localStorage('getItem', 'banner')) {
        API.find.findBanners().then((res) => {
          this.banners = res.data.banners
          localStorage('setItem', 'banner', res.data.banners, 10000 * 60 * 10)
        })
      } else {
        this.banners = localStorage('getItem', 'banner')
        console.log(this.banners)
      }
    },
    //  首页导航图表按钮数据
    findHomePageIcon () {
      if (!localStorage('getItem', 'homePageIcon')) {
        API.find.findHomePageIcon().then((res) => {
          // console.log(res.data.data)
          this.homePageIcon = res.data.data
          localStorage(
            'setItem',
            'homePageIcon',
            res.data.data,
            10000 * 60 * 10
          )
        })
      } else {
        this.homePageIcon = localStorage('getItem', 'homePageIcon')
        // console.log(this.homePageIcon)
      }
    },
    // 首页发现数据
    findHomepageData () {
      if (!localStorage('getItem', 'homePageData')) {
        API.find.findHomepageData().then((res) => {
          // this.homePageData = res.data.data
          this.$set(this, 'homePageData', res.data.data)
          localStorage(
            'setItem',
            'homePageData',
            res.data.data,
            10000 * 60 * 10
          )
        })
      } else {
        // this.homePageData = localStorage('getItem', 'homePageData')
        this.$set(
          this,
          'homePageData',
          localStorage('getItem', 'homePageData')
        )
      }
      var a = 0
      const time = setInterval(() => {
        a++
        if (a > 1000 * 60) {
          clearInterval(time)
        }
        try {
          if (this.homePageData.blocks) {
            this.$set(this, 'blocks', this.homePageData.blocks)
            // console.log('find', this.homePageData.blocks)
            // 详细的 banner 图
            // this.banners = this.homePageData.blocks[0].extInfo.banners
            // this.$set(this, 'banners', this.homePageData.blocks[0].extInfo.banners)
            // 推荐歌单
            this.$set(this, 'recommendedSongList', this.homePageData.blocks[1])
            // 欧美流行歌曲精选
            this.$set(this, 'personalTailor', this.homePageData.blocks[2])
            clearInterval(time)
          }
        } catch (e) {
          console.log('data is loading')
        }
      }, 1)
    },
    linkTo () {
    }
  }

}
</script>
<style lang="less">
#main {
  width: 100vw;
  height: 88vh;
  background: linear-gradient(#dee4e6, white);

  .page {
    margin: auto;
    //margin-top: 5%;
    //padding-top: 1vh;
    //margin-left: 1vw;
    //margin-right: 1vw;
    height: 100%;
    overflow: scroll;

    .banner {
      width: 100%;
      height: 20%;
      //background: silver;
      .van-swipe {
        height: 95%;
        width: 100%;
        padding-top: 1.5%;

        .img {
          margin: 0 3%;
          width: 94%;
          height: 100%;
          border-radius: 10px;
        }

        /deep/ .van-swipe__indicators {
          display: none !important;
        }
      }
    }

    .home-page-icon {
      z-index: 999;
      width: 100%;
      //height: 13%;
      display: flex;
      justify-content: space-between;
      overflow-y: scroll;

      .for {
        border-bottom: 0.1px solid whitesmoke;
        padding-bottom: 3%;
        text-align: center;
        width: 100%;
        //line-height: 10%;

        img {
          width: 20vw;
        }

        .name {
          font-size: 12px;
        }
      }
    }

    .home-page-recommend-song-list,
    .home-page-personal-tailor,
    .home-page-music-mlog,
    .home-page-music-calendar{
      border-bottom: 0.1px solid #bbbbbb;
      padding-bottom: 4%;
      //border-radius: 0 0 7px 7px;
      margin-top: 3%;
      width: 100%;
      //height: 20%;
      .title {
        margin: auto;
        //height: 20%;
        width: 94%;
        display: flex;
        justify-content: space-between;

        .left {
          span {
            font-size: 1.2rem;
            font-weight: bold;
            font-family: "微软雅黑";
          }
        }

        .right {
          display: flex;

          span {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .main-box {
        margin-top: 3%;
        width: 100%;
        //height: 100%;
        //background: sienna;
        display: flex;
        justify-content: space-between;
        overflow-y: scroll;
        //display: -webkit-box;
        //overflow-x: -moz-scrollbars-none;
        .for {
          display: flex;
          flex-wrap: wrap;
          //align-items: center;
          margin: 0 1%;
          //height: 100%;
          position: relative;
          //background: #a0522d;
          img {
            width: 29vw;
            height: 29vw;
            border-radius: 8%;
          }
        }

        .for:first-child {
          margin-left: 3%;
        }

        .for:last-child {
          padding-right: 3%;
        }

        .play-number {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 5px 0px 5px 0px;
          padding: 0 5px;
          display: flex;
          align-items: center;

          svg {
            color: gray;
          }
        }

        .playlist-name {
          overflow: hidden;
          line-height: 0.9;

          span {
            font-size: 0.1rem;
          }
        }
      }
    }

    .home-page-personal-tailor {
      .main-box {
        display: flex;
        //background: silver;

        .for {
          //background: sienna;

          .for-for {
            align-content: center;
            display: flex;
            //background: gray;
            height: 9vh;
            justify-content: space-between;
            align-items: center;

            img {
              width: 15vw;
              height: 15vw;
            }

            .img {
              width: 15vw;
              height: 15vw;
              display: flex;
              justify-content: center;
              align-items: center;

              .icon {
                position: absolute;
                font-size: 8vw;
              }
            }

            .box:nth-child(2),
            .box:first-child {
              border-bottom: 0.01px solid silver;
            }

            .box {
              margin: 0 2.5vw;
              width: 65vw;
              height: 15vw;
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              .top {
                width: 100%;
                //height: 80%;
                //background: aqua;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: start;

                span:nth-child(2) {
                  margin-left: 2vw;
                  color: #828282;
                  font-size: 0.1rem;
                }
              }

              .bottom {
                width: 100%;
                //height: 20%;
                //background: aquamarine;
                font-size: 0.1rem;
              }
            }
          }
        }
      }
    }
  }

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
