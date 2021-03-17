<template>
  <!--  刷视频页面-->
  <div>
    <!--    :lazy-render="true"-->
    <van-swipe
      ref="swipe"
      vertical :show-indicators="false"
      :loop="false"
      @change="onChange"
      :initial-swipe="active"
      v-if="videoPlsyList[0]"
    >
      <van-swipe-item v-for="(item, index) in videoPlsyList" :key="index">
        <MediaNav/>
        <div class="top_BulletChat">
          <div class="hotComments" v-if="hotComments && comShow">
            <div class="tabs">
              <span class="tab tab0" id="tab0">
                <span v-for="(item , index) in hotComments"
                      :key="index" v-show="index%3===0"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
            <div class="tabs">
              <span class="tab tab1" id="tab1">
                <span v-for="(item , index) in hotComments"
                      :key="index" v-show="index%3===1"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
            <div class="tabs">
              <span class="tab tab2" id="tab2">
                <span v-for="(item , index) in hotComments"
                      :key="index" v-show="index%3===2"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
          </div>
          <div>
            <!--            .hotComments{-->
            <!--            width: 100%;-->
            <!--            height: 100%;-->
            <!--            background: red;-->
            <!--            }-->
          </div>
        </div>
        <span style="color: white;">
<!--        {{item.vid}}-->
        </span>
        <Video
          v-if="nowIndex === index && videoPlsyList[0].vid"
          class="Video"
          :id="item.title"
          loop
          :vid="item.vid"
          :cover="item.cover"
          :poster="item.cover"/>
        <div class="bottom_BulletChat comments">
          <div class="comments" v-if="comments && comShow">
            <div class="tabs">
              <span class="tab tab0" id="tab00">
                <span v-for="(item , index) in comments"
                      :key="index" v-show="index%4===0"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
            <div class="tabs">
              <span class="tab tab0" id="tab01">
                <span v-for="(item , index) in comments"
                      :key="index" v-show="index%4===1"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
            <div class="tabs">
              <span class="tab tab0" id="tab02">
                <span v-for="(item , index) in comments"
                      :key="index" v-show="index%4===2"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
            <div class="tabs">
              <span class="tab tab0" id="tab03">
                <span v-for="(item , index) in comments"
                      :key="index" v-show="index%4===3"
                      :style="{color:'#'+bulletChatColor[Math.round(Math.random() * bulletChatColor.length)]}">
                  {{ item }} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
              </span>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import MediaNav from '@/components/Navbar/mediaNav'
import Video from '@/components/media/video'
// import { Dialog } from 'vant'
import { api as API } from '@/api/api'

export default {
  name: 'videoPlay',
  components: { Video, MediaNav },
  data () {
    return {
      // radom: Math.round(Math.random() * this.bulletChatColor.length),
      comShow: false,
      bulletChatColor: [
        'fad0c4',
        'fad0c4',
        'a18cd1',
        'fbc2eb',
        'ff8177',
        'ff867a',
        'ff8c7f',
        'f99185'
      ],
      // 评论
      comments: [],
      // 热门评论
      hotComments: [],
      // 推荐视频分页
      offset: 0,
      // nowUrl
      nowUrl: '',
      // 激活中的index
      nowIndex: 0,
      // 默认index
      active: 0,
      // 总视频列表
      list: [{}],
      // 当前视频在list中的位置
      listIndex: 0,
      // 仅3个等待播放的视频
      videoPlsyList: [{}, {}, {}],
      // 点击获得的初始化数据
      first: {
        // 标题
        title: this.$route.query.singleTitle,
        // vid
        vid: this.$route.query.singleVID,
        // 是否播放
        play: true,
        // 封面
        cover: this.$route.query.singleCoverUrl,
        authorID: this.$route.query.AuthorID,
        authorName: this.$route.query.AuthorName
      }
    }
  },
  async mounted () {
    // 初始化
    await this.start()
    // 获取评论
    await this.getCommets(this.$route.query.singleVID)
  },
  methods: {
    //  当浏览到倒数第二个视频的时候 请求推荐视频 每次获取推荐视频5个
    //  初始化数据
    async start () {
      // 初始化 list
      await this.initialization_List()
      // 初始化的推荐视频 并且添加到 list 列表中
      // 初始化 videoPlsyList初始化 videoPlsyList
      await this.initializetion_RelatedVideos()
      // 渲染三个轮播页面
      // 完成初始化
      // await console.log(
      //   this.list,
      //   this.videoPlsyList
      // )
    },
    // 初始化 list
    initialization_List () {
      // console.log(this.$route.query)
      this.list[0] = this.first
    },
    // 初始化的推荐视频 并且添加到 list 列表中
    async initializetion_RelatedVideos () {
      await API.media.getRelatedVideos(this.$route.query.singleVID).then(res => {
        // 格式化 推荐数据
        res.data.data.forEach(item => {
          // 添加到 list 尾部
          this.list.push({
            title: item.title,
            vid: item.vid,
            play: false,
            cover: item.coverUrl,
            authorID: item.userId,
            authorName: item.username
          })
        })
      })
      // 初始化 videoPlsyList
      this.videoPlsyList = [this.list[0], this.list[1], this.list[2]]
    },
    // 监听索引值 来处理列表/
    onChange (index) {
      // console.log(this.videoPlsyList)
      // console.log(this.nowIndex, index, this.videoPlsyList.length)
      this.nowIndex = index
      if (index + 1 >= this.videoPlsyList.length) {
        API.video.get_recommend_video(this.offset).then(res => {
          // 格式化 推荐数据
          // var arr = []
          res.data.datas.forEach(item => {
            // console.log({
            //   title: item.data.title,
            //   vid: item.data.vid,
            //   play: false,
            //   cover: item.data.coverUrl,
            //   authorID: item.data.userId,
            //   authorName: item.data.username
            // })
            // 添加到 list 尾部
            this.videoPlsyList.push({
              title: item.data.title,
              vid: item.data.vid,
              play: false,
              cover: item.data.coverUrl,
              authorID: item.data.userId,
              authorName: item.data.username
            })
          })
          this.$refs.swipe.resize()
          // this.videoPlsyList.push(...arr)
          // console.log(
          //   this.videoPlsyList
          // )
        })
        // this.$refs.swipe.resize()
      }
    },
    // 获取热门评论
    getCommets (vid) {
      // console.log(vid)
      API.media.getVideoComment(vid).then(res => {
        // console.log(res.data)
        const coms = ['弹幕大军来袭! 请做好准备!!!']
        const hotComs = ['弹幕大军来袭! 请做好准备!!!']
        setTimeout(() => {
          res.data.comments.forEach(item => {
            coms.push(item.content)
          })
          this.comments = coms
        }, 1000)
        setTimeout(() => {
          res.data.hotComments.forEach(item => {
            hotComs.push(item.content)
          })
          this.hotComments = hotComs
        }, 1500)
        this.comShow = true
        // console.log(this.comments, this.hotComments)
      })
    }
  },
  watch: {
    nowIndex (newV, oldV) {
      this.comShow = false
      // console.log(this.videoPlsyList[this.nowIndex].vid)
      this.getCommets(this.videoPlsyList[this.nowIndex].vid)
    }
  },
  computed: {
    radom () {
      var a = Math.round(Math.random() * this.bulletChatColor.length)
      console.log(a)
      return a
    }
  }
}
</script>

<style scoped lang="less">
@keyframes tab0 {
  0% {
    transform: translateX(375px);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes tab1 {
  0% {
    transform: translateX(475px);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes tab2 {
  0% {
    transform: translateX(575px);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes tab3 {
  0% {
    transform: translateX(675px);
  }
  100% {
    transform: translateX(-100%);
  }
}

.van-swipe {
  position: absolute;
  top: 0;
  background: black;
  width: 100vw;
  height: 100vh;

  .van-swipe-item {
    width: 100vw;
    height: 100vh;

    .top_BulletChat {
      width: 100vw;
      height: 20vh;
      //background: sienna;

      .hotComments {
        width: 100% !important;
        height: 100% !important;
        //background: red;
        white-space: nowrap;

        .tabs {
          height: 33%;
          width: 100%;
          //background: sienna;
          //border: 1px springgreen solid;
          display: flex;
          overflow: scroll;
          align-items: center;

          .tab {
            //transform: translateX(500px);
          }

          #tab0 {
            transform: translateX(375px);
            animation: infinite tab0 57s linear;
          }

          #tab1 {
            transform: translateX(475px);
            animation: infinite tab1 47s linear;
          }

          #tab2 {
            transform: translateX(575px);
            animation: infinite tab2 37s linear;
          }

        }
      }
    }

    .Video {
      width: 100vw;
      height: 30vh;
      //background: whitesmoke;
    }

    .bottom_BulletChat {
      width: 100vw;
      height: 44vh;
      //background: antiquewhite;

      .comments {
        width: 100% !important;
        height: 100% !important;
        //background: seagreen;
        white-space: nowrap;

        .tabs {
          height: 25%;
          width: 100%;
          //background: sienna;
          //border: 1px springgreen solid;
          display: flex;
          overflow: scroll;
          align-items: center;

          .tab {
            transform: translateX(500px);
          }

          #tab00 {
            transform: translateX(375px);
            animation: infinite tab0 37s linear;
          }

          #tab01 {
            transform: translateX(475px);
            animation: infinite tab1 47s linear;
          }

          #tab02 {
            transform: translateX(575px);
            animation: infinite tab2 57s linear;
          }

          #tab03 {
            transform: translateX(675px);
            animation: infinite tab3 67s linear;
          }
        }
      }
    }
  }
}

video {
  width: 100%;
  height: 100%;
}
</style>
