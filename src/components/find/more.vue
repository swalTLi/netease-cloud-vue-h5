<template>
  <div>
    <span>
    {{span1}}
    </span>
    <span>
      {{span2}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'more',
  data () {
    return {
      span1: ' ',
      span2: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.span1 = '未来将有更多内容...'
      this.span2 = '敬请期待...'
    }, 2000)
  }
}
</script>

<style scoped lang="less">
div {
  display: flex;
  flex-wrap: wrap;
  height: 30vw;
  width: 100vw;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  span {
    width: 100vw;
  }
}
</style>
