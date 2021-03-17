<template>
  <!--  私人定制-->
  <!--  私人定制-->
  <!--  私人定制-->
  <div>
    <transition class="fade">
      <div class="home-page-personal-tailor" v-if="data.blockCode ==='HOMEPAGE_BLOCK_STYLE_RCMD'">
        <font size="1" color="gray" style="margin-left: 3%;">
          {{ data.uiElement.mainTitle.title }}
        </font>
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
          <div class="for" v-for="(box,box_index) in data.creatives" :key="box_index" >
            <div class="for-for" v-for="(box2 , box2_index) in box.resources" :key="box2_index" @click="goLink(box2)">
              <div class="img">
<!--                <van-icon name="play-circle"/>-->
                <svg class="icon" aria-hidden="true" >
                  <use xlink:href="#icon-bofang3"></use>
                </svg>
                <img :src="box2.uiElement.image.imageUrl" alt="">
              </div>
              <div class="box">
                <div class="top">
                  <span>
                    {{ box2.uiElement.mainTitle.title}}
                  </span>
                  <span>
                    {{ '-'+ box2.resourceExtInfo.artists[0].name}}
                  </span>
                </div>
                <div class="bottom">
                  <span v-if="box2.uiElement.subTitle">
                          {{ box2.uiElement.subTitle.title }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HOMEPAGE_BLOCK_STYLE_RCMD',
  date () {
    return {
      data: this.data
    }
  },
  mounted () {
    // console.log(this.data.blockCode, this.data)
  },
  methods: {
    goLink (item) {
      console.log(item)
      this.$router.push({
        name: 'MusicPlaying',
        params: {
          data: item
        },
        query: {
          type: '1',
          typeInfo: '单曲',
          // 歌曲名称
          singleName: item.resourceExtInfo.songData.name,
          // 歌曲id
          singleID: item.resourceExtInfo.songData.id,
          // 歌曲img
          singleImg: item.resourceExtInfo.songData.album.picUrl,
          // 歌曲背景
          singleBackground: item.uiElement.image.imageUrl,
          // 作者名称
          AuthorName: item.resourceExtInfo.artists[0].name,
          // 作者id
          AuthorID: item.resourceExtInfo.artists[0].id
        }
      })
    }
  },
  props: ['data']
}
</script>
