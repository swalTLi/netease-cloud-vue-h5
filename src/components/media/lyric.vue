<template>
  <div class="lyric">
    <div class="lyric-content" ref="lyric">
      <div class="lyric-item-wrapper" v-if="lyricContent">
        <div :class="['lyric-item', {'active': activeIndex === index}]" v-for="(item,index) in lyricContent"
             :key="index" @click="lyricClick(item)">
          {{ item.content }}
        </div>
      </div>
<!--      <div class="play-btn" @click="playClick">{{ playBtnText }}</div>-->
    </div>
    <audio id="audio" ref="audio" v-if="src" controls preload :src="src" autoplay></audio>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  props: ['src', 'text', 'singleID'],
  data () {
    return {
      scroll: null,
      activeIndex: 0,
      lyricContent: [],
      playBtnText: '暂停'
    }
  },
  mounted () {
    // console.log(this.text)
    this.tool(this.text)
    // this.$refs.audio.play()
  },
  methods: {
    init () {
      try {
        document.getElementById('audio')
          .addEventListener('timeupdate', e => {
            const timeStamp = e.target.currentTime * 1000
            this.activeIndex = this.lyricContent.findIndex((item, index) => {
              return item.ms < timeStamp && this.lyricContent[index + 1]
                ? this.lyricContent[index + 1].ms > timeStamp : true
            })
            this.scroll.scrollTo(0, 54 + -27 * this.activeIndex, 500)
          })
      } catch (e) { // console.log(e)
      }
    },
    lyricScrollInit () {
      this.scroll = new BScroll(this.$refs.lyric)
      this.scroll.scrollTo(0, 54)
    },
    playClick () {
      // this.$refs.audio.play()
      if (this.playBtnText === '暂停') {
        this.$refs.audio.play()
        this.playBtnText = '播放'
      } else {
        this.$refs.audio.pause()
        this.playBtnText = '暂停'
      }
    },
    lyricClick (item) {
      this.$refs.audio.currentTime = item.ms / 1000
    },
    tool (lrc) {
      // console.log(lrc)
      const lrc2Json = (lrc) => {
        const arr = lrc.split('\n')
        const timeReg = /^\[.*\]/
        const json = []
        if (!lrc) {
          lrc = '[00:00.00]'
        }
        arr.forEach((item, key) => {
          try {
            if (item.split(']')[0].length === 10) {
              item.split(']')[0].length = 9
            }
            const time = item.match(timeReg)[0].substr(1, 10)
            const minute = time.substr(0, 2)
            const second = time.substr(3, 2)
            const ms = time.substr(6, 3)
            json.push({
              time,
              ms: parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(ms) * 10,
              content: item.substr(10)
            })
          } catch (e) {
            return false
          }
        })
        // console.log(json)
        return json
      }
      var promise = Promise.resolve()
      promise.then(() => {
        this.lyricContent = lrc2Json(lrc)
      }).then(() => {
      }).then(() => {
        this.init()
        this.lyricScrollInit()
      }).then(() => {
        // this.playClick()
        // console.log(document.getElementById('audio'))
      })
    }
  }
}
</script>

<style lang="less" scoped>
#audio{
  width: 100% !important;
  //height: 7vh;
  z-index: 999;
  position: fixed;
  bottom: 0;
}
.lyric {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.lyric .lyric-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.lyric .lyric-content .lyric-item-wrapper .lyric-item {
  color: #999;
  height: 27px;
  transition: 1s;
  cursor: pointer;
  padding-left: 1em;
}
.lyric .lyric-content .lyric-item-wrapper .lyric-item.active {
  color: #333;
}
.lyric .lyric-content .play-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #999;
  cursor: pointer;
  font-size: 14px;
}
.lyric .lyric-content .play-btn:hover {
  color: #333;
}

//
//.lyric {
//  display: flex;
//  flex-wrap: wrap;
//  justify-content: center;
//  .lyric-content {
//    width: 100%;
//    height: 100%;
//    overflow: hidden;
//    background: rgba(0, 0, 0, 0.2);
//    border-radius: 8px;
//    user-select: none;
//
//    .lyric-item-wrapper {
//      .lyric-item {
//        color: #999;
//        height: 27px;
//        transition: all 1s;
//        cursor: pointer;
//        padding-left: 1em;
//
//        &.active {
//          color: #333;
//        }
//      }
//    }
//
//    .play-btn {
//      position: absolute;
//      right: 10px;
//      top: 10px;
//      color: #999;
//      cursor: pointer;
//      font-size: 14px;
//
//      &:hover {
//        color: #333;
//      }
//    }
//  }
//}
</style>
