<template>
  <div>
    <h4>登录体验更多精彩</h4>
    <form>
      <van-form @submit="onSubmit">

        <transition name="fade">
          <van-field
            :style="{background: isInput?'#ddfaea':''}"
            type="text"
            v-model="phone"
            name="phone"
            label="手机号"
            placeholder="手机号"
            readonly
            clearable
            @click="checkInput(1)"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
        </transition>

        <transition name="fade">
          <van-field
            class="field"
            :style="{background: isInput?'':'#ddfaea'}"
            v-model="md5_password"
            type="password"
            clearable
            name="md5_password"
            label="密码"
            placeholder="密码"
            @click="checkInput(0)"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </transition>
        <div style="margin: 16px;">
          <van-button
            :loading="disabled"
            loading-text="登录中..."
            color="linear-gradient(to right, seagreen, mediumseagreen)"
            :disabled='disabled'          round block type="info" native-type="submit">登录
          </van-button>
        </div>
      </van-form>
    </form>
    <van-number-keyboard
      title="小恶🐟安全键盘"
      :show="show"
      theme="custom"
      :extra-key="['清空']"
      :close-button-text=" isInput===0 ? '上一项':'下一项'  "
      @input="onInput"
      @delete="onDelete"
      @close="onNext"
    >
    </van-number-keyboard>
  </div>
</template>

<script>
// import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
import { api as API } from '@/api/api'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('loginVuex')
export default {
  name: 'phoneComp',
  data () {
    return {
      phone: '13898102230',
      md5_password: 'ldq2586463185',
      // 是否显示键盘
      show: true,
      // 当前选中那个输入框
      isInput: 1,
      disabled: false
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'UserInformation'
    ]),
    ...mapGetters({
    })
  },
  mounted () {
    // this.$store.dispath()
    console.log(this.$store.state.loginVuex.isLogin)
    if (this.$store.state.loginVuex.isLogin) {
      this.loading()
    }
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      loginSuccess: 'loginSuccess'
    }),
    onSubmit (v) {
      // 验证手机号码
      if (!(/^1[34578]\d{9}$/.test(v.phone))) {
        // this.phone = ''
        // this.md5_password = ''
        return this.$toast.fail('手机号格式错误')
      } else {
        API.login.loginPhone(13898102230, 'ldq2586463185').then(res => {
          console.log(res.data.token)
          if (res.data.code === 200) {
            // window.localStorage.setItem('Authorization', res.data.token)
            // axios.interceptors.request.use(config => {
            //   config.headers.common.Authorization = res.data.token
            //   return config
            // })
            // 登录成功 更改 vuex islogin登录状态 并把用户信息放到 vuex里面
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('cookie', res.data.cookie)
            this.loginSuccess({ res: res })
            // console.log(this.UserInformation)
            this.loading()
          }
        }).catch(e => {
          console.log(e)
          this.$toast({
            message: '登录失败,服务器未连接,请稍后重试',
            icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
          })
        })
      }
    },
    // 改变 按钮状态 延迟登录
    loading () {
      this.disabled = true
      this.$toast({
        message: '已经登录正在跳转',
        icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
      })
      // 前往首页
      setTimeout(() => {
        this.$router.push({ path: '/Little_evil_fish_music' })
      }, 2000)
    },
    checkInput (type) {
      // console.log(type)
      this.isInput = type
      this.show = !!type
      console.log(!!type)
    },
    onInput (value) {
      if (value === '清空') {
        if (this.isInput) {
          // eslint-disable-next-line no-return-assign
          return this.phone = ''
        } else {
          // eslint-disable-next-line no-return-assign
          return this.md5_password = ''
        }
      } else {
        if (this.isInput) {
          console.log(this.isInput)
          if (this.phone.length >= 11) return ''
          this.phone += value
        } else {
          console.log(this.isInput)
          if (this.md5_password.length >= 14) return ''
          this.md5_password += value
        }
      }
      console.log(this.phone, this.md5_password)
    },
    onDelete () {
      if (this.isInput) {
        var arr = this.phone.split('')
        arr.pop()
        this.phone = arr.join('')
      } else {
        var arr2 = this.md5_password.split('')
        arr2.pop()
        this.md5_password = arr2.join('')
      }
    },
    onNext () {
      if (this.isInput >= 1) {
        this.show = !this.show
        this.isInput = 0
        document.querySelector('.field>.van-field__value>.van-field__body>input').focus()
      } else {
        this.show = !this.show
        this.isInput = 1
        // document.querySelector('.field>.van-field__value>.van-field__body>input').blur()
      }
    }
  }
}
</script>

<style scoped lang="less">
h4 {
  margin: 2vh 4vw;
}
</style>
