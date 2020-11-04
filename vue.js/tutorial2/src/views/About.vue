<template>
  <div class="about">
    <h5>{{ msg }}</h5>
    
    <router-link to="/user/login/001">登录001</router-link>
  </div>
</template>

<script>
export default {
    name: 'About',
    // props: {
    //     msg: String
    // },
    data(){
        return {
            msg: "默认About的内容"
        }
    },
    methods: {
        
    }
}
</script>
