<template>
<div>
  MV
</div>
</template>

<script>
export default {
  name: 'MV',
  data () {
    return {

    }
  },
  updated () {
    console.log(this.MV)
  },
  mounted () {
    console.log(this.MV)
  },
  methods: {

  },
  props: ['MV'],
  watch: {
  }
}
</script>

<style scoped>

</style>
