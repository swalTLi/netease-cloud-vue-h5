<template>
  <div class="login">
    <div class="img">
      <div class="cycle"
           :style="{
          width: css.imgWidth+'px',
          height: css.imgWidth+'px'
          }">
        <div>
          <img ref="img" :src=img128 v-if="!imgBool" alt="">
        </div>
        <transition name="fade">
          <img ref="img" class="iii img1" :src=img96 v-if="imgBool" alt="">
          <!--          <img ref="img" class="iii img2" :src=img128 v-if="!imgBool" alt="">-->
        </transition>
        <div class="cycle"
             :style="{
          width: css.imgWidth2+'px',
          height: css.imgWidth2+'px',
          position:'absolute'
          }">
        </div>
      </div>
    </div>
    <!--    style="background: silver"-->
    <div class="handle-area">
      <div class="height"><span style="display:none;">占位</span></div>
      <transition name="fade">
        <div class="music-power" v-if="imgBool">
          <van-button class="click" type="primary" color="white" block
                      @click="loginType('Phone')">
            <span style="color: seagreen;font-family: 方正粗体;">手机号登录</span>
          </van-button>
          <van-button class="click" type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" block
                      @click="loginType('ExperienceNow')">
            <span style="font-family: 方正粗体;">立即体验</span>
          </van-button>
        </div>
      </transition>
    </div>
    <div class="handle-area2">
      <transition name="fade">
        <div class="bottom" v-if="!imgBool">
          小鳄鱼音乐 · 音乐的力量
          <van-divider style="color:#000000 ;">
            <font size="1">小恶🐟音乐支持IPv6网络</font>
          </van-divider>
        </div>
        <div class="bottom2" v-if="imgBool">
          <div class="button">
            <van-button color="rgba(0,0,0,0)" round @click="loginType('WeChat')">
              <img src="../../assets/image/weixin32.png" alt=""></van-button>
            <van-button color="rgba(0,0,0,0)" round @click="loginType('QQ')">
              <img src="../../assets/image/qq32.png" alt=""></van-button>
            <van-button color="rgba(0,0,0,0)" round @click="loginType('SinaWeibo')">
              <img src="../../assets/image/weibo32.png" alt=""></van-button>
            <van-button color="rgba(0,0,0,0)" round @click="loginType('Netease')">
              <img src="../../assets/image/wangyi32.png" alt=""></van-button>
          </div>
          <div class="check-box">
            <van-checkbox v-model="checked" checked-color="mediumseagreen" icon-size="10px"
                          shape="square"/>
            <div class="span">
              <font size="1" style="color: whitesmoke;">同意</font>
              <span style="color: white;">《用户协议》《隐私政策》《儿童隐私政策》</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import img96 from '../../assets/image/ey96.png'
import img128 from '../../assets/image/ey128.png'

export default {
  name: 'login',
  compontents: { },
  data () {
    return {
      t: '正在跳转',
      css: {
        imgWidth: 0,
        imgWidth2: 0
      },
      img96: img96,
      img128: img128,
      imgBool: false,
      checked: false,
      rule: {
        ExperienceNow: (type) => {
          this.$dialog.confirm({
            title: '立即体验',
            message: '体验内容无需登录，可以直接使用，但是部分数据无法加载！'
          })
            .then(() => {
              // on confirm
              this.t = '正在跳转...'
              this.$toast({
                message: this.t,
                icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
              })
              setTimeout(() => {
                this.t = '检测安全环境...'
                this.$toast({
                  message: this.t,
                  icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
                })
              }, 1500)
              setTimeout(() => {
                this.t = '环境安全，即将跳转...'
                this.$toast({
                  message: this.t,
                  icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
                })
              }, 3000)
              // 前往首页
              setTimeout(() => {
                this.$router.push({ path: '/Little_evil_fish_music' })
              }, 5000)
            })
            .catch(() => {
              // on cancel
            })
        },
        Phone: (type) => {
          this.$router.push({ path: '/loginPage/' + type, query: { type: type } })
        },
        default: (type) => {
          this.$toast({
            message: type + '接口暂未开放',
            icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
          })
          // this.$router.push({ path: '/loginPage/' + type, query: { type: type } })
        }
      }
    }
  },
  mounted () {
    this.imgRadius()
    this.checked = true
  },
  methods: {
    imgRadius () {
      setTimeout(() => {
        this.css.imgWidth = 100
        this.css.imgWidth2 = 50
        this.imgBool = !this.imgBool
        setInterval(() => {
          if (this.css.imgWidth <= 250) {
            this.css.imgWidth += 1
          } else {
            this.css.imgWidth = 100
          }
        }, 15)
        setInterval(() => {
          if (this.css.imgWidth2 <= 200) {
            this.css.imgWidth2 += 1
          } else {
            this.css.imgWidth2 = 0
          }
        }, 15)
      }, 1000 / 100)
    },
    loginType (type) {
      if (!this.checked) {
        return this.$toast({
          message: '请先勾选同意《用户协议》《隐私政策》《儿童隐私政策》',
          icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
        })
      }
      if (this.rule[type]) {
        this.rule[type](type)
      } else {
        this.rule.default(type)
      }
    }
  }
}
</script>
<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  //transition: opacity .5s;
  background: mediumseagreen;

  .img {
    //background: mediumseagreen;
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .cycle {
      border: 1px solid #5fd493;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .iii {
        //transition: 1.5s;
        z-index: 999;
        background: whitesmoke;
        border-radius: 100%;
        transform: translateX(-1000px);
      }

      .img2 {
        z-index: 999;
        background: whitesmoke;
        border-radius: 100%;
        transform: translateX(-1px);
      }

      .img1 {
        transform: translateX(-0px);
        transition: 1s;
      }
    }
  }

  .handle-area {
    //transition: opacity .5s;
    //background: mediumseagreen;
    width: 100vw;
    height: 35vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .height {
      width: 100vw;
      height: 10vh;
      //background: saddlebrown;
    }

    .music-power {
      width: 100vw;
      //height: 10vh;
      //background: red;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .click {
        width: 80vw;
        margin-top: 1vh;
      }
    }
  }

  .handle-area2 {
    //transition: opacity .5s;
    width: 100vw;
    //height: 15vh;
    //background: mediumseagreen;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    color: #000000;
    font-size: 20px;
    font-weight: 600;
    font-family: 方正粗体;

    .bottom {
      width: 100vw;
      height: 7vh;
    }

    .bottom2 {
      .button {
        width: 80vw;
        height: 100%;
        display: flex;
        justify-content: space-around;
      }

      button {
        width: 50px;
        height: 50px;
        border-radius: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
        //padding-top: 7px;
      }

      .check-box {
        margin: auto;
        width: 55vw;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        transform: scale(0.8);

        .span {
          display: flex;
          justify-content: space-around;
          align-items: center;

          span {
            font-weight: lighter;
            font-size: 1px;
          }
        }
      }
    }
  }
}

</style>
