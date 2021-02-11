<template>
  <div>
    {{this.$route.query.key}}
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$route.query.key)
  }
}
</script>

<style scoped>

</style>
