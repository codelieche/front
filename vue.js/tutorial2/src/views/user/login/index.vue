

<template>
  <HomeIndex :layoutDisplay="layoutDisplay"></HomeIndex>
</template>

<script>
import HomeIndex from '@/views/home/index.vue'

export default {
  name: 'UserLoginIndex',
  components: {
    HomeIndex,
  },
  data() {
    return {
      layoutDisplay: {
      showHeader: false,
      showLeft: false,
      showMain: true,
      showRight: true,
      showFooter: false,
    }
    }
  },
}
</script>
