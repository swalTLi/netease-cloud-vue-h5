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
        <svg class="icon" aria-hidden="true" @click="openSidebar">
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
          @click="handleSearchBtn"
        >
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
        ></van-search>
      </template>
      <template #right v-if="
                  searchType==='find'
                ||searchType==='search'
                ||searchType==='find'
                ||searchType==='video'
                ||searchType==='find'
                ||searchType==='mine'
">
        <svg class="icon" aria-hidden="true" @click="clickHelpBtn">
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
  </div>
</template>

<script>
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'

export default {
  name: 'index',
  data () {
    return {
      active: 0,
      searchKey: undefined,
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
      link: ['browseVideos', 'classification']
    }
  },
  mounted () {
    // 分解出当前url的关键字段
    var url = this.$route.fullPath.split('?')[0]
    console.log(url)
    if (!url.split('/')[2]) {
      this.searchType = 'find'
    } else {
      this.searchType = url.split('/')[2]
    }
    console.log(this.searchType)
    this.searchDefaultKey()
  },
  methods: {
    // 清空search内容
    clickEmptySearch () {
      this.searchKey = undefined
    },
    // 返回上一级
    back () {
      this.$router.go(-1)
    },
    linkTo (link) {
      if (this.$route.fullPath.split('/').pop() !== this.link[link]) {
        this.$router.push('/Little_evil_fish_music/video/' + this.link[link])
      }
    },
    goToSearch () {
      //  保存当前输入框内的关键词
      var oldHistory = localStorage('getItem', 'historyData')
      // 如果history为空则初始化
      oldHistory ??= []
      var newKey = this.searchKey ?? this.search.defaultKey.realkeyword
      // 存入当前浏览历史记录
      // 把相同历史记录 挪到数组第一位
      // console.log(newKey, oldHistory)
      oldHistory.push(newKey)
      localStorage('setItem', 'historyData', [...new Set(oldHistory)], 1000 * 60 * 60 * 24 * 365)
      // console.log(localStorage('getItem', 'historyData'))
      console.log(newKey)
      this.searchKey = newKey
      this.$router.push({
        path: '/Little_evil_fish_music/searchResult',
        query: {
          key: 'searchkey'
        }
      })
    },
    clickHelpBtn () {
      this.$dialog.alert({
        title: '免责声明！',
        message: '👮‍♂️本软件仅供学习前端技术使用，不可用于商业行为！请使用者在看完源代码学会后，删除本软件，谢谢您！💋\n保护版权，人人有责',
        confirmButtonColor: 'linear-gradient(to right, seagreen, mediumseagreen)',
        theme: 'round-button'
      }).then(() => {
        // on close
      })
    },
    handleSearchBtn () {
      if (this.$route.fullPath.split('/')[2] !== 'search') {
        this.$router.push({
          path: '/Little_evil_fish_music/search'
        })
      }
    },
    openSidebar () {
    },
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
      console.log(this.searchType)
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
    background: linear-gradient(to right, seagreen, mediumseagreen);
  }
}
</style>
