<template>
  <div>
    User Index Page
    <div>
      <router-link to="/user/login">登录</router-link> |
      <router-link to="/user/info">信息</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
}
</script>