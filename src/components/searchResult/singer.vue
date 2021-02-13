<template>
  <div>
    singer
  </div>
</template>

<script>
export default {
  name: 'singer',
  data () {
    return {
      songs: {

      }
    }
  },
  mounted () {
    console.log(this.data)
    this.songs = JSON.parse(this.data)
    console.log(this.songs)
  },
  methods: {},
  props: ['data']
}
</script>

<style scoped>

</style>
