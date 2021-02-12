<template>
  <div>
    <div class="hotSearch" v-if="historyData.length>0">
      <div class="title">
        <div class="left">
              <span style="font-size: 12px;">
                历史
              </span>
        </div>
        <div class="history">
          <div class="for" v-for="(item,index) in historyData" :key="index">
            <van-button class="item" :text=historyData[historyData.length-index-1]
                        size="mini" color="whitesmoke"
                        round type="info"
                        @click="clickHistory(historyData[historyData.length-index-1])"
            />
          </div>
        </div>
        <div class="right">
          <van-button
            size="mini"
            style="border: 0;"
            round
            @click="deleteHistory"
          >
                  <span style="font-size: 18px;">
                    <van-icon name="delete-o"/>
                </span>
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { localStorage } from '@/common/localStorage'

export default {
  name: 'hotSearch',
  data () {
    return {
      historyData: []
    }
  },
  mounted () {
    this.historyData = localStorage('getItem', 'historyData')
  },
  methods: {
    // 删除历史
    deleteHistory () {
      this.$dialog.confirm({
        title: '删除搜索记录吗！',
        message: '🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹',
        confirmButtonColor: 'linear-gradient(to right, seagreen, mediumseagreen)',
        theme: 'round-button',
        beforeClose
      }).then(() => {
        localStorage('setItem', 'historyData', [])
        this.historyData = localStorage('getItem', 'historyData')
        this.$forceUpdate()
      }).catch(e => {})
      function beforeClose (action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000)
        } else {
          done()
        }
      }
    },
    // 点击历史记录搜索
    clickHistory (key) {
      // console.log(key)
      //  跳转到searchResult页面
      this.$router.push({
        path: '/Little_evil_fish_music/searchResult',
        query: {
          key: key
        }
      })
    }
  },
  watch: {
    // 改变激活状态
    '$route.fullPath' (newV, oldV) {
      this.historyData = localStorage('getItem', 'historyData')
    }
    // console.log(this.searchType)
  }
}
</script>
<style scoped lang="less">

.hotSearch {
  border-bottom: 0px solid #bbbbbb;
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
    align-items: center;
    justify-content: space-between;

    .left {
      span {
        font-size: 1.2rem;
        font-weight: bold;
        font-family: "微软雅黑";
      }
    }

    .history {
      width: 83%;
      display: flex;
      align-items: center;
      overflow: scroll;

      .for {
        display: flex;

        /deep/ .item {
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          //width: 100%;
          //margin: 0;
          //padding: 0 10px;
          color: black !important
        }
      }
    }

    .right {
      span {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: start;
      }
    }
  }

  .main-box, .van-collapse > .main-box {
    margin: auto;
    //height: 20%;
    width: 94%;
    display: flex;
    justify-content: space-between;
    //background: sienna;
    flex-wrap: wrap;

    .for {
      width: 50%;
      height: 2rem;
      //background: sandybrown;
      display: flex;
      align-items: center;

      .index {
        width: 10%;
      }

      .cell {
        margin-left: 5%;
        font-size: 0.7rem;
      }

      img {
        margin-left: 2vw;
      }
    }
  }

  .show {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-button {
      text-align: center;
      display: flex;
      align-content: center;
      align-items: center;
    }

    .van-button--info {
      border: 0 white solid;
    }
  }

  /deep/ .van-collapse-item__content {
    padding: 0 !important;
    color: black;
  }
}
</style>
