<template>
  <div>
     {{this.$route.query.key}}
  </div>
</template>

<script>
import { api as API } from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$route.query.key)
    API.search.getSearchResult('')
  }
}
</script>

<style scoped>

</style>
