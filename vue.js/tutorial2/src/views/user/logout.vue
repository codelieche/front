<template>
  <span></span>
</template>

<script>
export default {
  name: 'UserLogoutPage',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      const url = '/api/v1/account/logout'
      this.$http
        .get(url)
        .then((response) => response.data)
        .then((data) => {
          if (data.status) {
            this.$message({
              message: '退出登录成功',
              type: 'success',
            })
            this.$router.push('/user/login')
          } else {
            this.$message({
              message: '退出登录成功',
              type: 'error',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>