<template>
  <div id="app">
    <router-view/>
    <div class="TabBar">
      <TabBar/>
    </div>
  </div>
</template>
<script>

import TabBar from './components/TabBar/index.vue'
export default {
  name: 'APP',
  components: { TabBar }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  font-family: 方正粗体;
}
.van-toast {
  width: 100vw !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

*::-webkit-scrollbar {

  display: none
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.TabBar{
  width: 100vw;
  height: 6%;
  background: sienna;
}
</style>
