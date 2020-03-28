<template>
  <div class="page-index">
    <el-row>
      <el-col :span="19">
        <div v-show="type==1" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to="/scenics">旅游地</router-link>
            </h2>
          </div>
          {{scenicsError}}
          <scenics :list="scenicsList" />
        </div>
        <div v-show="type==2" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to="/note">游记</router-link>
            </h2>
          </div>
          {{noteError}}
          <note :list="noteList" :type="100" />
        </div>
        <div v-show="type==3" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to="/guide">攻略</router-link>
            </h2>
          </div>
          {{guideError}}
          <guide :list="guideList" :type="200" />
        </div>
        <div v-show="type==4" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to>用户</router-link>
            </h2>
          </div>
          {{userError}}
          <user :list="userList" type="0" />
        </div>
      </el-col>
      <el-col :span="5">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import scienics from "@/models/scenics";
import note from "@/models/note";
import guide from "@/models/guide";
import user from "@/models/user";
import Scenics from "@/components/public/scenics-list"
import Note from "@/components/public/article-list";
import Guide from "@/components/public/article-list";
import User from "@/components/public/user-list";

export default {
  components: {
    Scenics,
    Note,
    Guide,
    User
  },
  inject: ['reload'],
  data () {
    return {
      id: '',
      scenicsList: [],
      scenicsError: '',
      noteList: [],
      noteError: '',
      guideList: [],
      guideError: '',
      userList: [],
      userError: '',
      type: ''
    };
  },
  methods: {
    async init () {
      const { loginUser } = this.$store.state;
      if (loginUser) {
        this.id = loginUser.id;
      }
      let search = this.$route.query.q
      this.type = this.$route.query.type
      if(!search){
        this.$message({
          showClose: true,
          message: '你没有填写搜索内容',
          type: 'error'
        });
        setTimeout(() => {
          this.$router.push({path: '/main'})
        }, 1000)
      }
      switch (this.type) {
        case '1':
          try {
            this.scenicsList = await scienics.getScenicsByKeyword(search)
            console.log(this.scenicsList)
          } catch (error) {
            console.log(error)
            this.scenicsError = error.data.msg
          }
          break;
        case '2':
          try {
            this.noteList = await note.getNoteByKeyword(search)
            console.log(this.noteList)
          } catch (error) {
            console.log(error)
            this.noteError = error.data.msg
          }
          break;
        case '3':
          try {
            this.guideList = await guide.getGuideByKeyword(search)
            console.log(this.guideList)
          } catch (error) {
            console.log(error)
            this.guideError = error.data.msg
          }
          break;
        case '4':
          try {
            this.userList = await user.getUserByKeyword(search)
            console.log(this.userList)
          } catch (error) {
            console.log(error)
            this.userError = error.data.msg
          }
          break;
        default:
          this.$message({
            showClose: true,
            message: '你没有选择类型',
            type: 'error'
          });
          setTimeout(() => {
            this.$router.push({path: '/main'})
          }, 1000)
      }
    },
  },
  async created () {
    await this.init();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      this.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.m-note {
  margin-top: 30px;
  .m-note-main h2 {
    float: left;
    font-size: 18px;
    font-weight: 700;
    a {
      color: #333;
    }
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
</style>
