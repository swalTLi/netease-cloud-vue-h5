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
          <van-button color="linear-gradient(to right, seagreen, mediumseagreen)"
                      round block type="info" native-type="submit">提交
          </van-button>
        </div>
      </van-form>
    </form>
    {{count}}
    <br>
    {{action}}
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
import loginPhone from '@/api/login'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'phoneComp',
  data () {
    return {
      phone: '13898102230',
      md5_password: 'ldq2586463185',
      // 是否显示键盘
      show: true,
      // 当前选中那个输入框
      isInput: 1
    }
  },
  // // 通过计算属性 获取store的数据
  // computed: mapState(
  //   // {
  //   // // 使用 箭头函数使代码简练
  //   //   count: state => state.count,
  //   //   // 功能同上 需要辅助函数mapState
  //   //   countAlias: 'count',
  //   //   // 为了能够使用 `this` 获取局部状态，必须使用常规函数
  //   //   count2 (state) {
  //   //     return state.count + 100
  //   //   }
  //   // }
  //   [
  //     'ldq'
  //   ]
  // ),
  // 混合计算属性获取数据
  computed: {
    count (state) {
      return this.$store.state.count
    },
    ...mapState({
      ldq: 'ldq',
      action: 'action'
    }),
    ...mapGetters([
      'doneTodos',
      'doneTodosCount',
      'getTodoById'
    ])
  },
  mounted () {
    // this.axios.get('http://www.lidaqing.plus:1901/banner').then(res => {
    //   console.log(res)
    // })
    // console.log(this.$store.commit('increment'))
    // console.log(this.$store.state.count)
    // console.log(this.ldq)
    // console.log(this.count)
    // console.log(this.$store.getters.doneTodos)
    // console.log(this.$store.getters.doneTodosCount)
    // console.log(this.$store.getters.getTodoById(2))
    // this.$store.commit({
    //   type: 'increment',
    //   amount: 1000
    // })
    // setInterval(() => {
    //   this.$store.commit({
    //     type: 'ddaddCount'
    //   })
    // }, 1000)
    // console.log(this.$store.state)
    // this.$store.dispatch('add')
    // this.$store.dispatch({ type: 'increment', amount: 9 })
    // this.add({ amount: 5 })
    // this.incrementAsync({ amount: 30 })
    // this.add()
    this.actionA().then(res => {
      // console.log(res)
    })
    this.actionB()
  },
  methods: {
    ...mapActions({
      add: 'add',
      actionA: 'actionA',
      actionB: 'actionB'
    }),
    ...mapActions([
      'incrementAsync'
    ]),
    ...mapMutations({
      addCount: 'addCount'
    }),
    ...mapMutations([
      'addCount'
    ]),
    checkInput (type) {
      // console.log(type)
      this.isInput = type
      this.show = !!type
      console.log(!!type)
    },
    onSubmit (v) {
      // 验证手机号码
      if (!(/^1[34578]\d{9}$/.test(v.phone))) {
        // this.phone = ''
        // this.md5_password = ''
        return this.$toast.fail('手机号格式错误')
      } else {
        loginPhone(13898102230, 'ldq2586463185').then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$toast({
              message: '登录成功',
              icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
            })
            // 保存到vuex
            // 保存到cookie
            // 前往首页
            this.$router.push({ path: '/login' })
          }
        })
      }
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
