<template>
  <div>
    <transition name="fade">
      <!--      广告位-->
      <div class="adv">
        <adv :bannerData="banners"/>
      </div>
    </transition>
    <transition name="fade">
      <!--      历史搜索记录位置-->
      <div class="history">
        <history/>
      </div>
    </transition>
    <transition name="fade">
      <!--      热搜榜-->
      <div>
        <hotSearch/>
      </div>
    </transition>
    <!--      推荐按钮专区-->
    <transition name="fade">
      <div v-if="1">
      </div>
    </transition>
  </div>
</template>

<script>
import { api as API } from '@/api/api'
import { localStorage } from '@/common/localStorage'
// 组件
import adv from '../../../components/search/adv'
import hotSearch from '../../../components/search/hotSearch'
import history from '../../../components/search/history'

export default {
  name: 'index',
  components: {
    adv, hotSearch, history
  },
  data () {
    return {
      banners: []
    }
  },
  mounted () {
    this.findBanners()
  },
  activated () {
    this.findBanners()
  },
  methods: {
    // 详细的 banner 图数据
    findBanners () {
      var data = []
      // 优先加载缓存
      if (!localStorage('getItem', 'banner')) {
        API.find.findBanners().then((res) => {
          data = res.data.banners
          localStorage('setItem', 'banner', res.data.banners, 10000 * 60 * 10)
        })
      } else {
        data = localStorage('getItem', 'banner')
      }
      //  渲染
      data.forEach((item, index) => {
        // console.log(item.imageUrl)
        this.banners.push(item.imageUrl)
        // console.log(this.banners)
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
