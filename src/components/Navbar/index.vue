<template>
  <div>
    <van-nav-bar
      id="tab"
      :placeholder=true
      :fixed=true
      :safe-area-inset-top=true
      :border=false
    >
      <template #left>
        <svg class="icon" aria-hidden="true" @click="openSidebar">
          <use xlink:href="#icon-gengduo2"></use>
        </svg>
      </template>
      <template #title v-if="NavBarType[searchType]">
        <van-search
          v-model="searchKey"
          :show-action="$route.fullPath.split('/')[2]==='search'"
          :shape="$route.fullPath.split('/')[2]==='search'?'square':'round'"
          background="rgba(0,0,0,0)"
          :placeholder="search.defaultKey.showKeyword"
          @click="handleSearchBtn"
        >
          <template #action v-if="searchType==='search'" >
            <div @click="goToSearch">搜索</div>
          </template>
        </van-search>
      </template>
      <template #title v-if="this.searchType === 'video'">
        video
      </template>
      <template #right>
        <svg class="icon" aria-hidden="true" @click="clickHelpBtn">
          <use xlink:href="#icon-wenjuantiaocha"></use>
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
      searchKey: '',
      searchType: '',
      search: {
        defaultKey: {
          showKeyword: '',
          realkeyword: ''
        }
      },
      NavBarType: {
        find: 1,
        search: 1
      }
    }
  },
  mounted () {
    if (!this.$route.fullPath.split('/')[2]) {
      this.searchType = 'find'
    } else {
      this.searchType = this.$route.fullPath.split('/')[2]
    }
    console.log(this.searchType)
    this.searchDefaultKey()
  },
  methods: {
    goToSearch () {
    //  保存当前输入框内的关键词
      var oldHistory = localStorage('getItem', 'historyData')
      var hash = []
      for (var i = 0; i < oldHistory.length; i++) {
        if (oldHistory.indexOf(oldHistory[i]) === i) {
          hash.push(oldHistory[i])
        }
      }
      localStorage('setItem', 'historyData',
        [this.searchKey === '' ? this.search.defaultKey.realkeyword : this.searchKey, ...hash]
        , 1000000)
      console.log(localStorage('getItem', 'historyData'))
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
      console.log(1)
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

}
</style>
