<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user">用户页面</router-link>
      <router-link to="/tutorial">Tutorial</router-link>
    </div>
    <div class="center">
      <div class="logo">
        <img alt="Vue logo" src="@/assets/logo.png" />
      </div>
      <div>
        <span class="el-icon-user-solid"></span>
      </div>
      <HelloWorld :msg="message" :callback="HelloWorldCallback" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomePage',
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.commit('updateHeaderSlug', '/')
  },
  data() {
    return {
      message: '你好！Vue.js',
    }
  },
  methods: {
    HelloWorldCallback() {
      console.log('callback:')
      console.log(this.$router);
      if (this.message.indexOf('Vue') >= 0) {
        this.message = '你好！Callback'
      } else {
        this.message = '你好！Vue.js'
      }
    },
  },
}
</script>

<style lang="less" scroped>
.home {
  width: 100%;
  position: relative;
  .center {
    position: relative;
    left: 50%;
    top: 50%;
    width: 500px;
    transform: translate(-50%, 50%);
    .logo {
      left: 50%;
      top: 50%;
      width: 500px;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      border: 10px solid #eee;
      border-radius: 100px;
      padding: 10px;
      position: relative;
      img {
        padding: 10px;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        position: relative;
        top: 10px;
      }
    }
  }
}
</style>
