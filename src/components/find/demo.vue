<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'demo',
  date () {
    return {
      data: this.data
    }
  },
  mounted () {
    console.log(1, this.data)
  },
  methods: {},
  props: ['data']
}
</script>
