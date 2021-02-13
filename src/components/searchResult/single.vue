<template>
  <div>
    <div class="singlePage">
      <div class="playAll">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <span>播放全部</span>
      </div>
      <div class="lists" v-if="singles.songs">
        <ul>
          <li v-for="(item,index) in singles.songs" :key="index">
            <div>
              <div class="top">
              <span v-if="item.name">
                 {{ item.name }}
              </span>
              </div>
              <div class="bot">
              <span v-if="item.album">
                  {{ item.album.name }}
              </span>
               <span v-if="item.album &&item.artists">/</span>
                <span v-if="item.artists">
                {{ item.artists[0].name }}
              </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!singles.songs">
      您搜索的内容不存在!
    </div>
  </div>
</template>

<script>
import { localStorage } from '@/common/localStorage'
import { api as API } from '@/api/api'
import img1 from '@/assets/image/ey24.png'

export default {
  name: 'single',
  data () {
    return {
      result: ''
    }
  },
  mounted () {
    console.log(this.singles)
    if (this.singles.songs) {
      this.singles.songs.forEach(item => {
        // console.log(item.name, item)
      })
    } else {
      console.log('失败')
    }
  },
  methods: {
    start (key, type, offset) {
      const toast = this.$toast({
        message: '加载数据中',
        forbidClick: true,
        icon: img1
      })
      var name = 'getSearchResult' +
        '单曲' +
        this.$route.query.key
      if (!localStorage('getItem', name)) {
        API.search.getSearchResult(key, type, offset).then(res => {
          // console.log(res.data.result)
          localStorage('setItem', name, res.data.result)
          this.result = res.data.result
          this.data = this.result
          toast.clear()
          this.$forceUpdate()
        }).catch(e => {
        })
      } else {
        this.result = localStorage('getItem', name)
        this.data = this.result
        toast.clear()
        this.$forceUpdate()
      }
    }
  },
  props: ['singles'],
  watch: {
    single (newV, oldV) {
      console.log(newV, oldV)
    },
    '$route.query.key' (newV, oldV) {
      // console.log(newV, oldV)
      // API.search.getSearchResult(this.$route.query.key).then(res => {
      //   console.log(res)
      // })
      // this.$forceUpdate()
      console.log(newV)
      // 加载中...
      this.start(newV, 1)
    }
  }
}
</script>
<style scoped lang="less">
.singlePage {
  width: 100%;
  height: 83vh;
  //background: sienna;
  overflow-y: scroll;
  overflow-x:hidden;

  .playAll {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: start;
    align-items: center;
    align-content: center;

    .icon {
      font-size: 1.8rem;
      margin: 0 3%;
    }

    span {
      font-size: 17px;
      font-weight: bold;
    }
  }

  .playAll:active {
    background: #d7d7d7;
  }

  .lists {
    width: 100%;

    ul {

      li {
        height: 8vh;
        width: 94%;
        padding: 0 4%;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;

        .top {
          width: 94vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
        }

        .bot {
          color: darkgrey;
          font-size: 12px;
        }
      }

      li:active {
        background: #d7d7d7;
      }
    }
  }
}
</style>
