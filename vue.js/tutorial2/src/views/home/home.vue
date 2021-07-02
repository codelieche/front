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

      <Resizable :maxWidth="400" :minWidth="150">
        <h1 :style="{background: '#eee'}">Resizable</h1>
      </Resizable>

      <Resizable :maxWidth="400" :minWidth="150">
        <h1 :style="{background: '#eee'}">Resizable 002</h1>
      </Resizable>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Resizable from '@/components/base/resizable.vue'
import fetchApi from '@/api/fetchApi'

export default {
  name: 'HomePage',
  components: {
    HelloWorld,
    Resizable,
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
      console.log(this.$router.currentRoute);
      if (this.message.indexOf('Vue') >= 0) {
        this.message = '你好！Callback'
      } else {
        this.message = '你好！Vue.js'
      }
      // 发起ajax请求
      // fetchApi.get('/api/v1/account/login')
      fetchApi.get('/api/v1/account/login')
        .then(response => {
          console.log(response.data)
        })
          .catch(err => {
            console.log(err)
          })
      
      fetchApi.post('/api/v1/account/login', {'ddd': 'good'})
        .then(response => {
          console.log(response.data)
        })
          .catch(err => {
            console.log(err)
          })
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
