<template>
  <div>
    <!--  推荐歌单-->
    <!--  推荐歌单-->
    <!--  推荐歌单-->
    <div class="home-page-recommend-song-list" v-if="rule[data.blockCode]">
      <transition name="fade">
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
      </transition>
      <transition name="fade">
        <div class="main-box">
          <div class="for" v-for="(box,index) in data.creatives" :key="index" @click="goLink(box)">
            <font size="1" class="play-number" v-if="box.resources">
              {{
                box.resources[0].resourceExtInfo.playCount > 10000 ?
                  box.resources[0].resourceExtInfo.playCount > 100000000 ?
                    (box.resources[0].resourceExtInfo.playCount/100000000).toString().split('.')[0] + "亿+":
                  (box.resources[0].resourceExtInfo.playCount/10000).toString().split('.')[0] + "万+":
                  box.resources[0].resourceExtInfo.playCount
              }}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
            </font>
            <font size="1" class="play-number" v-if="box.creativeExtInfoVO">
              {{
                box.creativeExtInfoVO.playCount
              }}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
            </font>
            <img :src="box.uiElement.image.imageUrl" alt="">
            <div class="playlist-name">
              <font size="1">{{
                  box.uiElement.mainTitle.title.length > 20 ? box.uiElement.mainTitle.title.substring(0, 20) + "..." : box.uiElement.mainTitle.title
                }}</font>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ruleFindPageUiElement } from '@/common/rules'

export default {
  name: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD',
  date () {
    return {
      data: this.data,
      rule: ruleFindPageUiElement
    }
  },
  created () {
    this.rule = ruleFindPageUiElement
  },
  mounted () {
    // console.log(this.data.blockCode, this.data)
  },
  methods: {
    goLink (item) {
      // console.log(item)
      this.$router.push({
        name: 'songListInfo',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '歌单',
          // 专辑名称
          songListName: item.uiElement.mainTitle,
          // 专辑id
          songListID: item.creativeId,
          // 专辑背景
          songListBackgroundUrl: item.resources[0].uiElement.image.imageUrl
          // 作者名称
          // singerName: item.creator.nickname
          // 作者id
          // singerID: item.creator.id,
          // 作者img
          // singerImage: item.creator.img1v1Url
        }
      })
    }
  },
  props: ['data']
}
</script>
