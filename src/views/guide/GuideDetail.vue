<template>
  <div class="page-index">
    <el-row>
      <el-col :span="18">
        <div class="post-list clearfix">
          <div class="status-avatar clearfix">
            <router-link class="avatar-pic" :to="'/user/'+ list.id">
              <img :src="list.avatar" :alt="list.nickname" />
            </router-link>
          </div>
          <div class="status-content">
            <router-link class="user-name" :to="'/user/'+ list.id">{{ list.nickname }}</router-link>
            <span class="time">{{ list.create_time }}</span>
            <div class="post-title">
              <h1 class="title">{{ list.title }}</h1>
            </div>
            <div class="content" id="myContent"></div>
          </div>
          <div class="attractions-list clearfix">
            <div class="list-header clearfix">
              <h4 class="title">相关旅行地</h4>
            </div>
            <ul class="today-notes-list clearfix">
              <li class="pull-left" v-for="(item, idx) in arounds" :key="idx">
                <router-link class="img-box" :to="'/scenics/'+item.id">
                  <img v-lazy="item.image" :alt="item.name" />
                  <p>{{item.name}}</p>
                </router-link>
              </li>
            </ul>
          </div>
          <comment :id="id" :type="type" />
        </div>
      </el-col>
      <el-col :offset="1" :span="5">
        <el-button class="post" type="primary" icon="el-icon-edit" @click="post">发布攻略</el-button>
        <recommend />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Comment from '@/components/base/comment/comment'
import Guide from '@/models/guide'
import Recommend from "@/components/public/recommend-list";

export default {
  data() {
    return {
      id: '',
      type: 200,
      list: [],
      arounds: []
    }
  },
  async created(){
    this.id = this.$route.params.id
    await this.initData()
  },
  methods: {
    async initData () {
      try {
        let { guide, arounds } = await Guide.getGuide(this.id)
        // console.log(guide)
        // console.log(arounds)
        this.list = guide
        this.arounds = arounds
      } catch (error) {
        console.log(error)
        this.$message.error(error.data.msg);
      }

      document.getElementById('myContent').innerHTML = this.list.text

      if(this.$route.query.comments){
        this.findComments()
      }
    },
    findComments(){
      setTimeout(() => {
        document.querySelector('#comments').scrollIntoView({ behavior: "smooth" });
      }, 1000)
    },
    post() {
      this.$router.push({path: '/editor?type=guide'})
    },
  },
  components: {
    Comment,
    Recommend
  }
}
</script>
<style lang="scss" scoped>
.post-list {
  margin-top: 20px;
  .status-avatar {
    float: left;
    margin-right: 15px;
    padding: 15px 0 0 10px;
    .avatar-pic {
      display: block;
      width: 50px;
      height: 50px;
      border: none;
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
  }
  .status-content {
    width: 720px;
    position: relative;
    color: #222;
    float: left;
    padding: 15px 0;
    .user-name {
      color: #696;
      text-decoration: none;
    }
    .time {
      color: #666;
      margin-left: 20px;
    }
    .post-title {
      display: table;
      .title {
        position: relative;
        display: inline-block;
        padding-right: 2em;
        margin: 12px 0 15px;
        font-size: 18px;
        font-weight: 700;
        color: #333 !important;
      }
    }
  }
  
  .attractions-list {
    margin-bottom: 5px;
    margin-top: 40px;
    text-align: center;
    float: left;
    width: 100%;
    .list-header {
      border-top: 1px #ccc solid;
      position: relative;
      height: 30px;
      margin-top: 20px;
      .title {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 42%;
        margin: -32px 0 0;
        width: 16%;
        background: #fff;
        line-height: 30px;
        color: #333;
        font-size: 16px;
        font-weight: 400;
      }
    }
    .today-notes-list {
      display: inline-block;
      li {
        margin-left: 0;
        width: 230px;
        margin: 15px 33px 15px 0;
        .img-box {
          display: block;
          overflow: hidden;
          color: #333;
          img {
            width: 230px;
            height: 163px;
            border-radius: 5px;
            display: inline-block;
          }
          p {
            margin: 10px 0;
            text-overflow: clip;
            white-space: normal;
            height: 36px;
            line-height: 18px;
            text-align: center;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.post {
  margin: 20px auto;
  display: inherit;
}
</style>