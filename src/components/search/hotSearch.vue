<template>
  <div>
    <div class="hotSearch">
      <div class="title">
        <div class="left">
              <span>
                热搜榜
              </span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >
                <span>
                  <van-icon name="arrow"/>
                播放
                </span>
          </van-button>
        </div>
      </div>
      <div class="main-box" v-if="newHotData">
        <div class="for" v-for="(item,index) in newHotData" :key="index" v-show="index<=9">
          <div class="index" :style="{color:index+1>3? '#a0a0a0':'red' }" v-if="index<=9">
            {{ index + 1 }}
          </div>
          <div class="cell" :style="{fontWeight:index+1>3? '500': '1000' }" v-if="index<=9">
            {{ item.searchWord }}
          </div>
          <img :src="item.iconUrl" alt="" height="15px" v-if="item.iconUrl&&index<=9">
        </div>
      </div>
      <div class="show" v-if="!show">
        <van-button plain hairline type="info" @click="hide" style=" color: grey !important;">
          <font size="0.1" style="font-size: 0.1rem">展开更多热搜</font>
          <van-icon name="arrow-down"/>
        </van-button>
      </div>
      <transition name="fade">
        <div class="main-box" v-if="show">
          <div class="for" v-for="(item,index) in newHotData" :key="index" v-show="index>9">
            <div class="index" :style="{color:index+1>3? '#a0a0a0':'red' }" v-if="index>9">
              {{ index + 1 }}
            </div>
            <div class="cell" :style="{fontWeight:index+1>3? '500': '1000' }" v-if="index>9">
              {{ item.searchWord }}
            </div>
            <img :src="item.iconUrl" alt="" height="15px" v-if="item.iconUrl&&index>9">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { api as API } from '@/api/api'

export default {
  name: 'hotSearch',
  data () {
    return {
      show: false,
      newHotData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    hide () {
      this.show = true
    },
    getData () {
      API.search.searchHotDetal().then((res) => {
        console.log(res.data.data)
        this.newHotData = res.data.data
      })
    }
  }
}
</script>
<style scoped lang="less">

.hotSearch {
  border-bottom: 0 solid #bbbbbb;
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
