<template>
  <div class="header">
    <router-link to="/" key="header-logo">
      <div class="logo" >
        <img src="@/assets/logo.png" alt="codelieche" />
        <span> 编程教程 </span>
      </div>
    </router-link>

    <div class="nav">
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/user">用户</router-link>
        </li>
        <li>
          <router-link to="/tutorial">Tutorial</router-link>
        </li>
        <li>
          <router-link to="/tutorial/slot">Slot</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
@HeaderHight: 50px;
@LogoHeight: 30px;
.header {
  background-color: #333744;
  height: @HeaderHight;
  text-align: left;
  .logo,
  .nav {
    display: inline-block;
  }
  .logo {
    // float: left;
    height: @HeaderHight;
    // padding: 10px;
    box-sizing: border-box;
    color: #f9f9f9;
    padding-left: 10px;
    img {
      padding: 5px;
      height: 20px;
      width: 20px;
      border-radius: 25px;
      background-color: #f8f8f8;
      display: inline-block;
      margin-bottom: 10px;
    }
    span {
      display: inline-block;
      height: 50px;
      padding: 10px 5px;
      line-height: 40px;
      overflow: hidden;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .nav {
    float: right;
    color: #f9f9f9;
    height: @HeaderHight;
    overflow: hidden;
    margin: 0px 0px;
    box-sizing: border-box;
    ul {
      list-style: none;
      margin-block-start: none;
      display: block;
      color: #f8f8f8;
      margin-block-start: 0em; // 浏览器自动填充了
      margin-block-end: 0em;
      padding-inline-start: 10px;
      li {
        margin: 0;
        padding: 0;
        display: inline-block;
        height: @HeaderHight;
        text-align: center;
        &:hover,
        a.router-link-exact-active {
          background-color: #4a5064;
        }
        a {
          min-width: 60px;
          padding: 0 10px;
          color: #f8f8f8;
          display: inline-block;
          height: @HeaderHight;
          line-height: @HeaderHight;
          text-decoration: none;
        }
        // height: 60px;
      }
    }
  }
}
</style>