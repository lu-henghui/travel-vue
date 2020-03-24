<template>
  <div class="page-index">
    <div :gutter="20">
      <el-col :span="18" :offset="3">
        <div class="personal-home">
          <div class="info">
            <div class="clearfix">
              <div class="status-avatar pull-left">
                <span class="avatar-pic">
                  <el-avatar :size="75" :src="user.avatar ? user.avatar : defaultAvatar"></el-avatar>
                </span>
              </div>
              <div class="status-content pull-left">
                <div class="clearfix mb15">
                  <div class="user-name pull-left clearfix">
                    <h2 class="pull-left ml20">{{user.nickname}}</h2>
                  </div>
                  <div class="ml20 pull-left">
                    <span class="mr20">{{user.sex}}</span>
                    <span>{{user.city}}</span>
                  </div>
                  <el-button v-if="!isMe">关注</el-button>
                  <router-link to="/setting?type=basic" class="changeInfo pull-right">修改资料</router-link>
                </div>
              </div>
              <div class="ops mt10">
                <span>讨论（1）</span>
                <span>攻略（1）</span>
                <span>游记（1）</span>
                <span>粉丝（1）</span>
                <span>关注（1）</span>
              </div>
            </div>
            <p class="simple-introduce" v-if="isIntroduce">
              简介：
              <em class="declaration">{{user.introduce}}</em>
            </p>
          </div>
          <div class="content mt40"></div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import defaultAvatar from "@/assets/img/user/user.png";
import user from "@/models/user";

export default {
  data() {
    return {
      isMe: true,
      isIntroduce: true,
      defaultAvatar,
      user: {
        nickname: "",
        avatar: "",
        sex: "",
        city: "",
        introduce: ""
      }
    };
  },
  async created () {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.user = await user.getUser(this.$route.params.id)
        console.log(this.user)
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
    }
  },
};
</script>
<style lang="scss">
.page-index {
  position: relative;
  margin-top: 10px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .personal-home {
    padding: 25px 10px 0;
    min-height: 700px;
    .info {
      padding: 20px 25px;
      width: 650px;
      position: relative;
      z-index: 999;
      border: 1px solid #ccc;
      background: #fff;
      color: #222;
      border-radius: 5px;
      box-shadow: 1px 2px 3px rgba(232, 232, 232, 0.8);
      margin: 0 auto;
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
        width: 480px;
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