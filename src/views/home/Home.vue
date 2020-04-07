<template>
  <el-container class="layout-default">
    <el-header class="header">
      <div class="m-header">
        <el-row :gutter="0">
          <el-col :span="11">
            <navbar />
          </el-col>
          <el-col :span="8">
            <search />
          </el-col>
          <el-col :offset="2" :span="3">
            <user />
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main ref="main">
      <app-main ref="appMain"></app-main>
    </el-main>
    <el-footer>
      <my-footer />
    </el-footer>
    <back-top :right="50" :bottom="50" :fontSize="34"></back-top>
  </el-container>
</template>
<script>
// import { NavBar, SideBar, AppMain, ReuseTab, MenuTab, BackTop } from '@/components/layout'
import { AppMain, BackTop } from '@/components/layout'
import { Navbar, Search, User } from '@/components/public/header'
import { MyFooter } from '@/components/public/footer'

export default {
  watch: {
    $route() {
      this.showBackTop = false
      if (this.scrollY <= 70) {
        // MenuTab组件高度
        this.backTop()
      }
    },
  },
  components:{
    AppMain,
    BackTop,
    MyFooter,
    Navbar,
    Search,
    User
  }
}
</script>
<style lang="scss">
.el-header,
.el-main,
.el-footer {
  width: 1065px;
  margin: 0 auto;
  padding: 0 !important;
  overflow: unset;
}
.el-header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  font-size: 16px;
  .m-header {
    width: 1190px;
    margin: 0 auto;
  }
}
.el-footer{
  height: auto!important;
}

.layout-default {
  -webkit-font-smoothing: antialiased;
  font-family: "-apple-system", BlinkMacSystemFont, Roboto, "Helvetica Neue",
    "MIcrosoft YaHei", sans-serif !important;
  background-color: #f8f8f8;
}
.m-header {
  background-color: #75a45d;
  @at-root .layout-default {
    .el-header {
      padding: 0;
      .m-header {
        width: 100%;
      }
    }
  }
}

.backTop {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  right: 50px;
  bottom: 50px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
  z-index: 99;
  background: #fff;

  .iconfont {
    font-size: 36px;
  }
}
</style>
