<template>
  <div class="m-nav clearfix">
    <div class="title">
      <p>游乐记</p>
    </div>
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" />
    </div>

    <ul class="nav clearfix">
      <li class="list">
        <router-link to="/">首页</router-link>
      </li>
      <li class="list">
        <router-link to="/scenics">景点</router-link>
      </li>
      <li class="list">
        <router-link to="/guide">攻略</router-link>
      </li>
      <li class="list">
        <router-link to="/note">游记</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.m-nav {
  float: left;
  margin: 0;
  padding: 0;
  z-index: 999;
  line-height: 60px;
  font-size: 18px;
  font-weight: 400;
  .title{
    height: 60px;
    float: left;
    line-height: 60px;
    margin-right: 30px;
    p{
      font-size: 30px;
      margin: 0 30px;
      color: #eee;
      font-weight: 500;
    }
  }

  .logo {
    height: 60px;
    float: left;
    line-height: 60px;
    margin-right: 10px;
    img {
      margin-top: 6px;
    }
  }
  .nav {
    float: right;
    > li {
      float: left;
      box-sizing: border-box;
      text-align: center;
      a {
        color: #fff;
        padding: 13px 15px 13px 15px;
      }
      &:hover {
        background-color: #6b9058;
      }
    }
  }
}
</style>
