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
      <template #title>
        <van-search
          shape="round"
          background="rgba(0,0,0,0)"
          :placeholder="search.defaultKey.showKeyword"
        />
      </template>
      <template #right>
        <svg class="icon" aria-hidden="true" @click="openSidebar">
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
      search: {
        defaultKey: {
          showKeyword: '',
          realkeyword: ''
        }
      }
    }
  },
  mounted () {
    this.searchDefaultKey()
  },
  methods: {
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
