<template>
  <div class="page-index">
    <div :gutter="20">
      <el-col :span="19" :offset="3">
        <div class="personal-home">
          <div class="info">
            <div class="clearfix">
              <div class="status-avatar pull-left">
                <span class="avatar-pic">
                  <el-avatar shape="square" :size="120" :src="user.avatar"></el-avatar>
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
                  <el-button v-if="!isMe && !isFollow" @click="follow(id)" class="pull-right">关注</el-button>
                  <el-button v-else-if="!isMe" @click="unfollow(id)" class="pull-right">取消关注</el-button>
                  <el-button v-else @click="toBasic" class="pull-right">修改资料</el-button>
                </div>
              </div>
              <div class="ops mt10 pull-left">
                <el-badge :value="user.notes" class="item">
                  <el-button @click="getNotesById" size="small">游记</el-button>
                </el-badge>
                <el-badge :value="user.guides" class="item">
                  <el-button @click="getGuidesById" size="small">攻略</el-button>
                </el-badge>
                <el-badge :value="user.fans" class="item" type="primary">
                  <el-button @click="getFansById" size="small">粉丝</el-button>
                </el-badge>
                <el-badge :value="user.follows" class="item" type="warning">
                  <el-button @click="getFollowsById" size="small">关注</el-button>
                </el-badge>
              </div>
            </div>
            <p class="simple-introduce" v-if="user.introduce">
              简介：
              <em class="declaration">{{user.introduce}}</em>
            </p>
          </div>
          <div v-show="showlList===0" class="content-list">
            <div class="m-note-main clearfix">
              <h2 class="m-note-left">
                <router-link to=''>游记</router-link>
              </h2>
              <el-button class="post" type="primary" icon="el-icon-edit" @click="postNote">发布游记</el-button>
            </div>
            <art :list="list" :type="type" :hasDelete="isMe" />
          </div>
          <div v-show="showlList===1" class="content-list">
            <div class="m-note-main clearfix">
              <h2 class="m-note-left">
                <router-link to="">攻略</router-link>
              </h2>
              <el-button class="post" type="primary" icon="el-icon-edit" @click="postGuide">发布攻略</el-button>
            </div>
            <art :list="list" :type="type" :hasDelete="isMe" />
          </div>
          <div v-show="showlList===2" class="content-list">
            <div class="m-note-main clearfix">
              <h2 class="m-note-left">
                <router-link to="/note">粉丝</router-link>
              </h2>
            </div>
            <ulist :list="list" type="0" />
          </div>
          <div v-show="showlList===3" class="content-list">
            <div class="m-note-main clearfix">
              <h2 class="m-note-left">
                <router-link to="/note">关注</router-link>
              </h2>
            </div>
            <ulist :list="list" type="1" />
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import Note from "@/models/note";
import Guide from "@/models/guide";
import Art from "@/components/public/article-list";
import Ulist from "@/components/public/user-list";

export default {
  components: {
    Art,
    Ulist
  },
  inject: ['reload'],
  data () {
    return {
      id: '',
      isMe: false,
      isFollow: false,
      user: {
        nickname: "",
        avatar: "",
        sex: "",
        city: "",
        introduce: "",
        followed: '',
        notes: '',
        guides: '',
        fans: '',
        follows: ''
      },
      list: [],
      type: '', // 游记类型为100 攻略类型为200
      showlList: '',
    };
  },
  async created () {
    this.init()
  },
  methods: {
    async init () {
      this.id = this.$route.params.id
      try {
        this.user = await User.getUser(this.id)
        this.isFollow = this.user.followed ? true : false
        console.log(this.user)
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
      const { user } = this.$store.state;
      if (user && user.id == this.id) {
        this.isMe = true
      }
    },
    async follow (id) {
      try {
        const res = await User.follow({ id })
        this.$message.success(`${res.msg}`)
        this.isFollow = true
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
    },
    async unfollow (id) {
      try {
        const res = await User.unfollow({ id })
        this.$message.success(`${res.msg}`)
        this.isFollow = false
      } catch (error) {
        console.log(error);
        this.$message.error(error.data.msg);
      }
    },
    toBasic () {
      this.$router.push({ path: '/setting?type=basic' })
    },
    // 获取用户ID的游记
    async getNotesById() {
      this.list = ''
      this.showlList = 0
      this.type = 100
      try {
        this.list = await Note.getNotesById(this.id);
      } catch (error) {
        console.log(error)
        this.$message(error.data.msg)
      }
    },
    // 获取用户ID的攻略
    async getGuidesById() {
      this.list = ''
      this.showlList = 1
      this.type = 200
      try {
        this.list = await Guide.getGuidesById(this.id);
      } catch (error) {
        this.$message(error.data.msg)
        // console.log(error)
      }
    },
    // 获取用户ID的粉丝
    async getFansById() {
      this.list = ''
      this.showlList = 2
      try {
        this.list = await User.getFansById(this.id);
      } catch (error) {
        this.$message(error.data.msg)
        // console.log(error)
      }
    },
    // 获取用户ID的关注
    async getFollowsById() {
      this.list = ''
      this.showlList = 3
      try {
        this.list = await User.getFollowsById(this.id);
      } catch (error) {
        this.$message(error.data.msg)
        // console.log(error)
      }
    },
    postNote() {
      this.$router.push({path: '/editor?type=note'})
    },
    postGuide() {
      this.$router.push({path: '/editor?type=guide'})
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      this.reload()
    }
  }
};
</script>
<style lang="scss" scoped>
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
    min-height: 400px;
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
            margin: 0 20px 0;
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
    .content-list{
      width: 840px;
      margin-top: 40px;
    }
  }
}
.m-note-main {
  .m-note-left {
    float: left;
    font-size: 18px;
    font-weight: 700;
  }
  .post {
    float: right;
  }
  a {
    color: #333;
  }
}
</style>