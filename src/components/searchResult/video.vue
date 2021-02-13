<template>
  <div>
    video
  </div>
</template>

<script>
export default {
  name: 'video',
  data () {
    return {
      songs: {
        hasMore: '',
        songCount: '',
        songs: []
      }
    }
  },
  mounted () {
    console.log(this.data)
    this.songs = JSON.parse(this.data)
    console.log(this.songs)
  },
  methods: {

  },
  props: ['data']
}
</script>

<style scoped>

</style>
