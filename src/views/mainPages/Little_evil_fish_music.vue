<template>
  <transition name="fade">
    <div id="main" v-if="transition">
      <div class="NavBar">
        <NavBar></NavBar>
      </div>
      <div class="page">
        <div class="banner">
          <transition name="fade">
            <van-swipe :autoplay="3000" v-if="transition">
              <van-swipe-item v-for="(item, index) in banners"
                              :key="index"
                              :show-indicators=false>
                <img class="img" v-lazy="item.pic" :src="item.pic"/>
              </van-swipe-item>
            </van-swipe>
          </transition>
        </div>
        <transition name="fade">
          <div class="home-page-icon" v-if="transition">
            <div class="for" v-for="(item,index) in homePageIcon" :key="index">
              <img :src="item.iconUrl" alt="">
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </transition>
        <div v-for="(item,index) in blocks" :key="index">
          <div class="home-page-recommend-song-list" v-if="item.blockCode ==='HOMEPAGE_BLOCK_PLAYLIST_RCMD'">
            <transition name="fade">
              <div class="title" v-if="transition">
                <div class="left" v-if="item.uiElement">
            <span>
              {{ item.uiElement.subTitle.title }}
            </span>
                </div>
                <div class="right" v-if="item.uiElement">
                  <van-button
                    size="mini"
                    round
                    @click="linkTo(item.uiElement.button.action)"
                  >
                <span>
              {{ item.uiElement.button.text }}<van-icon name="arrow"/></span>
                  </van-button>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div class="main-box" v-if="transition">
                <div class="for" v-for="(item,index) in item.creatives" :key="index">
                  <font size="1" class="play-number">
                    {{ item.resources[0].resourceExtInfo.playCount }}
                  </font>
                  <img :src="item.uiElement.image.imageUrl" alt="">
                  <div class="playlist-name">
                    <font size="1">{{ item.uiElement.mainTitle.title }}</font>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="home-page-personal-tailor" v-if="item.blockCode ==='HOMEPAGE_BLOCK_STYLE_RCMD'">
            <font size="1" color="gray" style="margin-left: 3%;">
              私人定制
            </font>
            <div class="title" v-if="transition">
              <div class="left" v-if="item.uiElement">
              <span>
                 {{ item.uiElement.subTitle.title }}
              </span>
              </div>
              <div class="right" v-if="item.uiElement">
                <van-button
                  size="mini"
                  round
                  @click="linkTo(item.uiElement.button.action)"
                >
                <span>
              {{ item.uiElement.button.text }}<van-icon name="arrow"/></span>
                </van-button>
              </div>
            </div>
            <div class="main-box" v-if="transition">
              <div class="for" v-for="(box,index) in recommendedSongList.creatives" :key="index">
                <font size="1" class="play-number">
                  {{ box.resources[0].resourceExtInfo.playCount }}
                </font>
                <img :src="box.uiElement.image.imageUrl" alt="">
                <div class="playlist-name">
                  <font size="1">{{ box.uiElement.mainTitle.title }}</font>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        <div class="banner">-->
<!--          <transition name="fade">-->
<!--            <van-swipe :autoplay="3000" v-if="transition">-->
<!--              <van-swipe-item v-for="(item, index) in banners"-->
<!--                              :key="index"-->
<!--                              :show-indicators=false>-->
<!--                <img class="img" v-lazy="item.pic" :src="item.pic"/>-->
<!--              </van-swipe-item>-->
<!--            </van-swipe>-->
<!--          </transition>-->
<!--        </div>-->
<!--        <transition name="fade">-->
<!--          <div class="home-page-icon" v-if="transition">-->
<!--            <div class="for" v-for="(item,index) in homePageIcon" :key="index">-->
<!--              <img :src="item.iconUrl" alt="">-->
<!--              <div class="name">{{ item.name }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </transition>-->

<!--        <div class="home-page-recommend-song-list">-->
<!--          <transition name="fade">-->
<!--            <div class="title" v-if="transition">-->
<!--              <div class="left" v-if="recommendedSongList.uiElement">-->
<!--            <span>-->
<!--              {{ recommendedSongList.uiElement.subTitle.title }}-->
<!--            </span>-->
<!--              </div>-->
<!--              <div class="right" v-if="recommendedSongList.uiElement">-->
<!--                <van-button-->
<!--                  size="mini"-->
<!--                  round-->
<!--                  @click="linkTo(recommendedSongList.uiElement.button.action)"-->
<!--                >-->
<!--                <span>-->
<!--              {{ recommendedSongList.uiElement.button.text }}<van-icon name="arrow"/></span>-->
<!--                </van-button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </transition>-->
<!--          <transition name="fade">-->
<!--            <div class="main-box" v-if="transition">-->
<!--              <div class="for" v-for="(item,index) in recommendedSongList.creatives" :key="index">-->
<!--                <font size="1" class="play-number">-->
<!--                  {{ item.resources[0].resourceExtInfo.playCount }}-->
<!--                </font>-->
<!--                <img :src="item.uiElement.image.imageUrl" alt="">-->
<!--                <div class="playlist-name">-->
<!--                  <font size="1">{{ item.uiElement.mainTitle.title }}</font>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </transition>-->
<!--        </div>-->
<!--        <div class="home-page-personal-tailor">-->
<!--          <font size="1" color="gray" style="margin-left: 3%;">-->
<!--            私人定制-->
<!--          </font>-->
<!--          <div class="title" v-if="transition">-->
<!--            <div class="left" v-if="recommendedSongList.uiElement">-->
<!--              <span>-->
<!--                 {{ recommendedSongList.uiElement.subTitle.title }}-->
<!--              </span>-->
<!--            </div>-->
<!--            <div class="right" v-if="recommendedSongList.uiElement">-->
<!--              <van-button-->
<!--                size="mini"-->
<!--                round-->
<!--                @click="linkTo(recommendedSongList.uiElement.button.action)"-->
<!--              >-->
<!--                <span>-->
<!--              {{ recommendedSongList.uiElement.button.text }}<van-icon name="arrow"/></span>-->
<!--              </van-button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="main-box" v-if="transition">-->
<!--            <div class="for" v-for="(item,index) in recommendedSongList.creatives" :key="index">-->
<!--              <font size="1" class="play-number">-->
<!--                {{ item.resources[0].resourceExtInfo.playCount }}-->
<!--              </font>-->
<!--              <img :src="item.uiElement.image.imageUrl" alt="">-->
<!--              <div class="playlist-name">-->
<!--                <font size="1">{{ item.uiElement.mainTitle.title }}</font>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import NavBar from '@/components/Navbar'
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'

Vue.use(Lazyload)
export default {
  name: 'Little_evil_fish_music',
  data () {
    return {
      blocks: '',
      banners: '', // 详细的 banner 图
      homePageIcon: '', // 首页导航图表按钮数据
      homePageData: '', // 首页发现数据
      recommendedSongList: '', // 推荐歌单
      personalTailor: '', // 私人定制
      transition: false
    }
  },
  created () {
    setTimeout(() => {
      this.transition = true
    })
  },
  mounted () {
    // await this.findBanners()
    this.findHomepageData()
    this.findHomePageIcon()
  },
  methods: {
    // 详细的 banner 图数据
    findBanners () {
      // 优先加载缓存
      if (!localStorage('getItem', 'banner')) {
        API.find.findBanners().then(res => {
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
        API.find.findHomePageIcon().then(res => {
          // console.log(res.data.data)
          this.homePageIcon = res.data.data
          localStorage('setItem', 'homePageIcon', res.data.data, 10000 * 60 * 10)
        })
      } else {
        this.homePageIcon = localStorage('getItem', 'homePageIcon')
        // console.log(this.homePageIcon)
      }
    },
    // 首页发现数据
    findHomepageData () {
      if (!localStorage('getItem', 'homePageData')) {
        API.find.findHomepageData().then(res => {
          // this.homePageData = res.data.data
          this.$set(this, 'homePageData', res.data.data)
          localStorage('setItem', 'homePageData', res.data.data, 10000 * 60 * 10)
        })
      } else {
        // this.homePageData = localStorage('getItem', 'homePageData')
        this.$set(this, 'homePageData', localStorage('getItem', 'homePageData'))
      }
      const time = setInterval(() => {
        try {
          if (this.homePageData.blocks[0]) {
            this.$set(this, 'blocks', this.homePageData.blocks)
            console.log('find', this.homePageData.blocks)
            // 详细的 banner 图
            // this.banners = this.homePageData.blocks[0].extInfo.banners
            this.$set(this, 'banners', this.homePageData.blocks[0].extInfo.banners)
            // 推荐歌单
            this.$set(this, 'recommendedSongList', this.homePageData.blocks[1])
            // 欧美流行歌曲精选
            this.$set(this, 'personalTailor', this.homePageData.blocks[2])
            clearInterval(time)
          }
        } catch (e) {
          console.log('data is loading')
        }
      }, 100)
    },
    linkTo () {
    }
  },
  components: {
    NavBar
  }
}
</script>
<style scoped lang="less">
#main {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#DEE4E6, white);
  .NavBar {
    height: 5%;
    //background-color: red;
  }
  .page {
    padding-top: 1vh;
    //margin-left: 1vw;
    //margin-right: 1vw;
    height: 88%;
    background: seagreen;
    margin: auto;
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
    .home-page-recommend-song-list, .home-page-personal-tailor {
      border-bottom: 0.1px solid #bbbbbb;
      padding-bottom: 4%;
      border-radius: 0 0 7px 7px;
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
        //height: 80%;
        //background: sienna;
        display: flex;
        justify-content: space-between;
        overflow-y: scroll;
        .for {
          display: flex;
          flex-wrap: wrap;
          //align-items: center;
          margin: 0 1%;
          width: 200px;
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
          //display: none;
          display: block;
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 5px 0px 5px 0px;
          padding: 0 5px;

        }

        .playlist-name {
          line-height: 0.9;

          span {
            font-size: 0.1rem;
          }
        }
      }
    }
    .home-page-personal-tailor{

    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
