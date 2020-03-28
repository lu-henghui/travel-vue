<template>
  <ul class="m-user clearfix">
    <li v-for="(item,idx) in list" :key="idx" class="clearfix">
      <div class="clearfix">
        <div class="status-avatar pull-left">
          <router-link class="avatar-pic" :to='"/user/" + item.id'>
            <el-avatar shape="square" :size="120" v-lazy="item.avatar"></el-avatar>
          </router-link>
        </div>
        <div class="status-content pull-left">
          <div class="clearfix mb15">
            <div class="user-name pull-left clearfix">
              <router-link class="avatar-pic" :to='"/user/" + item.id'>
                <h2 class="pull-left ml20">{{item.nickname}}</h2>
              </router-link>
            </div>
            <div class="ml20 pull-left">
              <span class="mr20">{{item.sex}}</span>
              <span>{{item.city}}</span>
            </div>
            <div v-show="isFollow">
              <el-button v-if="!item.followed" @click="follow(item.id)" class="pull-right">关注</el-button>
              <el-button v-else @click="unfollow(item.id)" class="pull-right">取消关注</el-button>
            </div>
          </div>
        </div>
        <div class="ops mt10 pull-left">
          <el-badge :value="item.notes" class="item">
            <el-button @click="toUser(item.id)" size="small">游记</el-button>
          </el-badge>
          <el-badge :value="item.guides" class="item">
            <el-button @click="toUser(item.id)" size="small">攻略</el-button>
          </el-badge>
          <el-badge :value="item.fans" class="item" type="primary">
            <el-button @click="toUser(item.id)" size="small">粉丝</el-button>
          </el-badge>
          <el-badge :value="item.follows" class="item" type="warning">
            <el-button @click="toUser(item.id)" size="small">关注</el-button>
          </el-badge>
        </div>
      </div>
      <p class="simple-introduce" v-if="item.introduce">
        简介：
        <em class="declaration">{{item.introduce}}</em>
      </p>
    </li>
  </ul>
</template>
<script>
import User from "@/models/user";

export default {
  props: [
    'list',
    'type'
  ],
  inject: ['reload'],
  data () {
    return {
      isFollow: false
    }
  },
  methods: {
    async follow (id) {
      try {
        const res = await User.follow({ id })
        this.$message.success(`${res.msg}`)
        setTimeout(() => {
          this.reload()
        }, 1000)
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
    },
    async unfollow (id) {
      try {
        const res = await User.unfollow({ id })
        this.$message.success(`${res.msg}`)
        setTimeout(() => {
          this.reload()
        }, 1000)
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
    },
    toUser(id) {
      this.$router.push({path: '/user/' + id })
    }
  },
  created() {
    if(this.type == 1){
      this.isFollow = true
    }else{
      this.isFollow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.m-user {
  li {
    padding: 15px;
    margin-top: 37px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 3px rgba(232, 232, 232, 0.8);
    .status-avatar {
      margin-right: 15px;
      // img {
      //   display: inline-block;
      //   width: 100px;
      //   height: 100px;
      //   border-radius: 5px;
      // }
    }
    .status-content {
      width: 480px;
      margin-bottom: 30px;
      .user-name {
        font-size: 16px;
        font-weight: 700;
        color: #222;
        display: inline-block;
        h2 {
          font-weight: 700;
          line-height: 1.1;
        }
      }
      .changeInfo {
        margin: 0 0 0 12px;
        padding: 4px 15px;
        border: 1px solid #dedede;
        background-color: #f9f9f9;
        color: #222;
      }
    }
    .ops {
      .item {
        margin-right: 40px;
        &:nth-child(1) {
          margin-left: 15px;
        }
      }
    }
    .simple-introduce {
      margin-top: 20px;
      line-height: 20px;
      margin-bottom: 0;
      .declaration {
        font-weight: 400;
        font-style: normal;
      }
    }
  }
}
</style>