<template>
  <div class="page-index">
    <el-row>
      <el-col :span="18">
        <div v-show="type==0" class="m-note clearfix">
          <div class="m-note-main clearfix">
              <router-link to="/scenics">搜索景点：</router-link>
          </div>
          <p>{{scenicsError}}</p>
          <scenics :list="scenicsList" />
          <div class="m-note-main clearfix">
            <router-link to="/note">搜索游记：</router-link>
          </div>
          <p>{{noteError}}</p>
          <note :list="noteList" :type="100" />
          <div class="m-note-main clearfix">
            <router-link to="/guide">搜索攻略：</router-link>
          </div>
          <p>{{guideError}}</p>
          <guide :list="guideList" :type="200" />
          <div class="m-note-main clearfix">
            <router-link to>搜索用户：</router-link>
          </div>
          <p>{{userError}}</p>
          <user :list="userList" type="0" />
        </div>
        <div v-show="type==1" class="m-note clearfix">
          <div class="m-note-main clearfix">
              <router-link to="/scenics">搜索景点：</router-link>
          </div>
          <p>{{scenicsError}}</p>
          <scenics :list="scenicsList" />
        </div>
        <div v-show="type==2" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <router-link to="/note">搜索游记：</router-link>
          </div>
          <p>{{noteError}}</p>
          <note :list="noteList" :type="100" />
        </div>
        <div v-show="type==3" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <router-link to="/guide">搜索攻略：</router-link>
          </div>
          <p>{{guideError}}</p>
          <guide :list="guideList" :type="200" />
        </div>
        <div v-show="type==4" class="m-note clearfix">
          <div class="m-note-main clearfix">
            <router-link to>搜索用户：</router-link>
          </div>
          <p>{{userError}}</p>
          <user :list="userList" type="0" />
        </div>
      </el-col>
      <el-col :offset="1" :span="5">
        <recommend />
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
import Recommend from "@/components/public/recommend-list";

export default {
  components: {
    Scenics,
    Note,
    Guide,
    User,
    Recommend
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
        case '0':
          try {
            this.scenicsList = await scienics.getScenicsByKeyword(search)
          } catch (error) {
            this.scenicsError = error.data.msg
          }
          try {
            this.noteList = await note.getNoteByKeyword(search)
          } catch (error) {
            this.noteError = error.data.msg
          }
          try {
            this.guideList = await guide.getGuideByKeyword(search)
          } catch (error) {
            this.guideError = error.data.msg
          }
          try {
            this.userList = await user.getUserByKeyword(search)
          } catch (error) {
            this.userError = error.data.msg
          }
          break;
        case '1':
          try {
            this.scenicsList = await scienics.getScenicsByKeyword(search)
          } catch (error) {
            this.scenicsError = error.data.msg
          }
          break;
        case '2':
          try {
            this.noteList = await note.getNoteByKeyword(search)
          } catch (error) {
            this.noteError = error.data.msg
          }
          break;
        case '3':
          try {
            this.guideList = await guide.getGuideByKeyword(search)
          } catch (error) {
            this.guideError = error.data.msg
          }
          break;
        case '4':
          try {
            this.userList = await user.getUserByKeyword(search)
          } catch (error) {
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
  .m-note-main {
    margin-top: 20px;
    margin-bottom: 20px;
    a {
      color: #333;
      font-weight: bold;
      font-size: 24px;
    }
  }
  p{
    text-indent: 2em;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
</style>
