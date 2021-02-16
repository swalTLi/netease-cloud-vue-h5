<template>
  <div>
    <div class="singerPage" v-if="user.userprofiles || user.users">
      <ul>
        <li v-for="(item,index) in user.userprofiles" :key="index">
          <div class="left" >
            <img :src="item.avatarUrl" alt="">
            <span>{{item.nickname}}</span>
          </div>
          <van-button
            size="mini"
            color="mediumseagreen"
            type="primary">
            查看用户
          </van-button>
        </li>
        <li v-for="(item,index) in user.users" :key="index">
          <div class="left" >
            <img :src="item.avatarUrl" alt="">
            <span>{{item.nickname}}</span>
          </div>
          <van-button
            size="mini"
            color="mediumseagreen"
            type="primary">
            查看用户
          </van-button>
        </li>
      </ul>
    </div>
    <div v-else>
      由于网易云接口权限问题,暂无数据,请尝试搜索其他关键词,或者浏览其他标签
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      result: '',
      err: false
    }
  },
  updated () {
    // console.log(this.user)
  },
  mounted () {
    // console.log(this.user)
  },
  methods: {},
  props: ['user'],
  watch: {
  }
}
</script>
<style scoped lang="less">
.singerPage {
  width: 100%;
  max-height: 83vh;
  //background: sienna;
  overflow-y: scroll;
  overflow-x: hidden;
  ul{
    display: flex;
    flex-wrap: wrap;
    li:active {
      background: #d7d7d7;
    }
    li{
      margin-top: 1vh;
      width: 94vw;
      padding: 0 3%;
      height: 8vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      .left{
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        align-content: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        img{
          width:50px;
          height:50px;
          border-radius: 100%;
        }
        span{
          padding-left:1rem ;
          font-size: 13px;
        }
      }
      .van-button{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        align-items: center;
      }
    }
  }
}
</style>
