<template>
  <div>
    <van-nav-bar
      id="tab"
      :placeholder=true
      :fixed=true
      :safe-area-inset-top=true
      :border=false
    >
      <template #left v-if="
                  searchType==='find'
                ||searchType==='search'
                ||searchType==='find'
                ||searchType==='video'
                ||searchType==='find'
                ||searchType==='mine'
">
        <svg class="icon" aria-hidden="true" @click="clickLeftBtn('open')">
          <use xlink:href="#icon-gengduo2"></use>
        </svg>
      </template>
      <template #left v-else-if="searchType">
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </template>
      <template #title
                v-if="
                searchType==='find'
                ||searchType==='search'
">
        <van-search
          v-model="searchKey"
          :show-action="$route.fullPath.split('/')[2]==='search'"
          :shape="$route.fullPath.split('/')[2]==='search'?'square':'round'"
          background="rgba(0,0,0,0)"
          :placeholder="search.defaultKey.showKeyword"
          @focus="handlesearchFocus=true"
          @click="handleSearchBtn"
          @input="handleSearchInput"
          @blur="blur"
        >
          <!--          @blur="handlesearchFocus=false"-->
          <template #action v-if="searchType==='search'">
            <div @click="goToSearch">搜索</div>
          </template>
        </van-search>
      </template>
      <template #title v-else-if="searchType === 'video'">
        <van-tabs v-model="active"
                  swipeable
                  animated
                  title-active-color
                  @click="linkTo">
          <van-tab title="刷视频"></van-tab>
          <!--          <van-tab title="分类"   ></van-tab>-->
        </van-tabs>
      </template>
      <template #title v-else-if="searchType === 'mine'">
        我的
      </template>
      <!--      搜索结果 searchResult-->
      <template #title v-else-if="searchType">
        <van-search
          :clearable="false"
          v-model="searchKey"
          :show-action="$route.fullPath.split('/')[2]==='search'"
          :shape="$route.fullPath.split('/')[2]==='search'?'square':'round'"
          background="rgba(0,0,0,0)"
          :placeholder="search.defaultKey.showKeyword"
          @focus="handlesearchFocus=true"
          @input="handleSearchInput"
          @blur="blur"
        ></van-search>
        <!--        @blur="handlesearchFocus=false"-->
      </template>
      <template #right v-if="
                  searchType==='find'
                ||searchType==='search'
                ||searchType==='find'
                ||searchType==='video'
                ||searchType==='find'
                ||searchType==='mine'
">
        <svg class="icon" aria-hidden="true" @click="clickRightBtn">
          <use xlink:href="#icon-wenjuantiaocha"></use>
        </svg>
      </template>
      <template #right v-else-if="searchType">
        <svg class="icon" aria-hidden="true" @click="clickEmptySearch">
          <transition name="fade">
            <use xlink:href="#icon-X-copy" v-if="searchKey"></use>
          </transition>
          <transition name="fade">
            <use xlink:href="#icon-X" v-if="!searchKey"></use>
          </transition>
        </svg>
      </template>
    </van-nav-bar>
    <div class="handlesearchFocus" v-show="handlesearchFocus">
      <ul>
        <li v-show="searchKey" @click.self="handleLiClick()">
          {{ '搜索 ' + '"' + searchKey + '"' }}
        </li>
        <li v-for="(item,index) in  KeyWordsAssociation"
            :key="index"
            @click="handleLiClick(item.keyword)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-Search'+index"></use>
          </svg>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <van-dialog v-model="leftBtn" title="退出登录"
                show-cancel-button
                @cancel="clickLeftBtn('close')"
                @confirm="clickLeftBtn('clear')">
      <div>
        <span style="font-size: 12px">
        退出登录并清空所有缓存？
        </span>
        <van-switch size="18px" v-model="checked"/>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('loginVuex')
export default {
  name: 'index',
  data () {
    return {
      checked: true,
      leftBtn: false,
      active: 0,
      searchKey: '',
      searchType: '',
      search: {
        defaultKey: {
          showKeyword: '',
          realkeyword: ''
        }
      },
      NavBarType: {
        leftBtn: ['find', 'search', 'video', 'mine'],
        find: ['find'],
        search: ['search'],
        searchResult: ['searchResult'],
        video: ['video', 'browseVideos', 'classification'],
        mine: ['mine']
      },
      link: ['browseVideos', 'classification'],
      // 关键词联想
      KeyWordsAssociation: [],
      // 焦点在search 弹出提示框
      handlesearchFocus: false
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'UserInformation'
    ]),
    ...mapGetters({})
  },
  mounted () {
    // 分解出当前url的关键字段
    var url = this.$route.fullPath.split('?')[0]
    if (!url.split('/')[2]) {
      this.searchType = 'find'
    } else {
      this.searchType = url.split('/')[2]
    }
    // console.log(this.searchType)
    this.searchDefaultKey()
    this.searchKey = this.$route.query.key
    this.$forceUpdate()
    // console.log(encodeURI(this.$route.fullPath.split('?')[1]))
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      loginSuccess: 'loginSuccess',
      loginOut: 'loginOut'
    }),
    // 失去焦点事件
    blur (e) {
      setTimeout(() => {
        this.handlesearchFocus = false
      }, 100)
    },
    // 搜索推荐li点击事件
    handleLiClick (key) {
      // 获取搜索关键词
      key = key ?? this.searchKey
      // console.log(key)
      // 关闭推荐列表
      this.handlesearchFocus = false
      // 保存关键词
      this.searchKey = key
      // 保存历史记录
      //  保存当前输入框内的关键词
      var oldHistory = localStorage('getItem', 'historyData')
      // 如果history为空则初始化
      oldHistory ??= []
      var newKey = key
      // 把相同历史记录 挪到数组第一位
      oldHistory.push(newKey)
      // 存入当前浏览历史记录
      localStorage('setItem', 'historyData', [...new Set(oldHistory)], 1000 * 60 * 60 * 24 * 365)
      // 跳转到 searchResult 页面
      // if (this.searchType === 'search') {
      this.$router.push({
        path: '/Little_evil_fish_music/searchResult',
        query: {
          key: key
        }
      })
      // }
    },
    // 获取关键词联想内容
    handleSearchInput (input) {
      // this.handlesearchFocus = false
      if (input) {
        // console.log(input)
        this.handlesearchFocus = true
        this.$forceUpdate()
        API.search.getSearchSuggestions(input).then(res => {
          this.KeyWordsAssociation = res.data.result.allMatch
        })
      }
    },
    // 清空search内容
    clickEmptySearch () {
      this.searchKey = ''
    },
    // 返回上一级
    back () {
      this.handlesearchFocus = false
      // this.$router.go(-1)
      this.$router.push('/Little_evil_fish_music/search')
    },
    // 切换videotab
    linkTo (link) {
      if (this.$route.fullPath.split('/').pop() !== this.link[link]) {
        this.$router.push('/Little_evil_fish_music/video/' + this.link[link])
      }
    },
    // 点击搜索按钮
    goToSearch (key) {
      //  保存当前输入框内的关键词
      var oldHistory = localStorage('getItem', 'historyData')
      // 如果history为空则初始化
      oldHistory ??= []
      var newKey = this.searchKey || this.search.defaultKey.realkeyword
      // 把相同历史记录 挪到数组第一位
      oldHistory.push(newKey)
      // 存入当前浏览历史记录
      localStorage('setItem', 'historyData', [...new Set(oldHistory)], 1000 * 60 * 60 * 24 * 365)
      this.searchKey = newKey
      this.handlesearchFocus = false
      this.$router.push({
        path: '/Little_evil_fish_music/searchResult',
        query: {
          key: newKey
        }
      })
    },
    // 点击页头右侧按钮
    clickRightBtn () {
      this.$dialog.alert({
        title: '免责声明！',
        message: '👮‍♂️本软件仅供学习前端技术使用，不可用于商业行为！请使用者在看完源代码学会后，删除本软件，谢谢您！💋\n保护版权，人人有责',
        confirmButtonColor: 'linear-gradient(to right, seagreen, mediumseagreen)',
        theme: 'round-button',
        confirmButtonText: '我已了解！'
      }).then(() => {
        // on close
      })
    },
    // 处理搜索框点击事件
    handleSearchBtn () {
      if (this.$route.fullPath.split('/')[2] !== 'search') {
        this.$router.push({
          path: '/Little_evil_fish_music/search'
        })
      }
    },
    // 页头tab左侧按钮点击事件
    clickLeftBtn (type) {
      console.log(type)
      // 清空数据代码
      var clearAllCookie = () => {
        console.log(this.checked)
        if (!this.checked) {
          return this.$router.push({ path: '/login' })
        }
        this.t = '正在清空localStorage...'
        this.$toast({
          message: this.t,
          icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
        })
        window.localStorage.clear()
        setTimeout(() => {
          this.t = '正在清空session...'
          this.$toast({
            message: this.t,
            icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
          })
          // 清空 vuex
          this.loginOut()
          window.sessionStorage.clear()
        }, 1000)
        setTimeout(() => {
          this.t = '正在清空cookie...'
          this.$toast({
            message: this.t,
            icon: 'https://www.easyicon.net/api/resizeApi.php?id=1284842&size=96'
          })
          var date = new Date()
          date.setTime(date.getTime() - 10000)
          var keys = document.cookie.match(/[^ =;]+(?==)/g)
          // console.log('需要删除的cookie名字：' + keys)
          if (keys) {
            for (var i = keys.length; i--;) {
              document.cookie = keys[i] + '=; expire=' + date.toGMTString() + '; path=/'
            }
          }
        }, 1000)
        // 前往首页
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 2000)
      }
      // 打开弹出框
      var typeOpen = () => {
        this.leftBtn = true
      }
      // 关闭弹出框
      var typeClose = () => {
        this.leftBtn = false
      }
      // eslint-disable-next-line no-unused-expressions
      type === 'open' ? typeOpen()
        : type === 'close' ? typeClose()
          : type === 'clear' ? clearAllCookie() : 1
      // console.log(document.cookie)
    },
    // 默认搜索推荐
    searchDefaultKey () {
      // 优先加载缓存
      if (!localStorage('getItem', 'searchDefaultKey')) {
        API.search.searchDefaultKey().then(res => {
          this.search.defaultKey = res.data.data
          localStorage('setItem', 'searchDefaultKey', res.data.data, 10000 * 60 * 10)
        })
      } else {
        this.search.defaultKey = localStorage('getItem', 'searchDefaultKey')
      }
    }
  },
  watch: {
    // 改变激活状态
    '$route.fullPath' (newV, oldV) {
      if (!this.$route.fullPath.split('/')[2]) {
        this.searchType = 'find'
      } else {
        this.searchType = this.$route.fullPath.split('/')[2]
      }
      this.searchKey = this.$route.query.key
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="less">

.icon {
  font-weight: 1000;
  font-size: 2rem;
}

#tab {
  margin: auto;
  display: flex;
  justify-content: center;

  /deep/ .van-nav-bar {
    background: #DEE4E6;

    input::placeholder {
      font-size: 0.9rem;
    }
  }

  /deep/ .van-nav-bar__title {
    min-width: 75%;
  }

  /deep/ .van-field__left-icon .van-icon {
    color: #323233;
  }

  /deep/ .van-search__content--round {
    background-color: #FFFFFF;
  }

  /deep/ .van-tabs {
    margin-left: 25%;
    width: 50% !important;
  }

  /deep/ .van-tabs__nav {
    background: rgba(0, 0, 0, 0) !important;
  }

  /deep/ .van-tabs__line {
    background: linear-gradient(to right,
    seagreen, mediumseagreen);
  }
}

.handlesearchFocus {
  margin-left: 15%;
  width: 70%;
  position: absolute;
  z-index: 999;

  ul {
    line-height: 2.5rem;
    box-shadow: #c9c9c9 0px 0px 10px; //将h-shadow,v-shadow设为0px,实现四周阴影
    li {
      padding: 0 10px;
      font-size: 1px;
      border: 0.1rem solid #e0e0e0;
      border-bottom: 0;
      background: white;
      display: flex;
      align-content: center;
      align-items: center;
    }

    li:first-child {
      color: royalblue;
    }

    li:last-child {
      border-bottom: 0.1rem solid #e0e0e0;
    }
  }
}

.van-dialog {
  div {
    margin-top: 5vw;
    margin-bottom: 5vw;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center
  }
}
</style>
