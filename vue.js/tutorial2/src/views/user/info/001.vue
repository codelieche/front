<template>
  <div>
    <div>
      <el-button type="info" @click="handleLogout">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo001',
  methods: {
    handleLogout() {
      window.sessionStorage.removeItem('isLogined')
      this.$router.push('/user/login')
    },
  },
}
</script>