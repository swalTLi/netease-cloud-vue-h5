<template>
<div>
  <!--  推荐歌单-->
  <!--  推荐歌单-->
  <!--  推荐歌单-->
  <div class="home-page-recommend-song-list" v-if="data.blockCode ==='HOMEPAGE_BLOCK_PLAYLIST_RCMD'">
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
        <div class="for" v-for="(box,index) in data.creatives" :key="index">
          <font size="1" class="play-number">
            {{ box.resources[0].resourceExtInfo.playCount }}
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
export default {
  name: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD',
  date () {
    return {
      data: this.data
    }
  },
  mounted () {
    console.log(1, this.data)
  },
  methods: {},
  props: ['data']
}
</script>
