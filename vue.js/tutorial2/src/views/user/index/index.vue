<template>
  <HomeIndex :layoutDisplay="layoutDisplay"></HomeIndex>
</template>

<script>
import HomeIndex from '@/views/home/index.vue'

export default {
  name: 'UserIndex',
  components: {
    HomeIndex,
  },
  mounted() {
    this.$store.commit('updateHeaderSlug', '/user')
    // this.$store.dispatch('updateHeaderSlugAsync', '/user')
  },
  beforeDestroy() {
    this.$store.commit('updateHeaderSlug', '/')
  },
  data() {
    return {
      layoutDisplay: {
      showHeader: true,
      showLeft: true,
      showMain: true,
      showRight: true,
      showFooter: false,
    }
    }
  },
}
</script>