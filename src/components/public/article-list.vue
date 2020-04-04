<template>
  <ul class="m-note-list clearfix">
    <li v-for="(item,idx) in list" :key="idx" class="clearfix">
      <div class="list-avatar pull-left">
        <router-link :to="'/'+ name +'/'+ item.id">
          <img v-lazy="item.img" :alt="item.title" />
        </router-link>
      </div>
      <div class="list-content pull-left">
        <div class="praise-box">
          <like :art_id="item.id" :type="type" :like_count="item.praise" :liked="item.liked" />
        </div>
        <div class="retweet clearfix">
          <div class="pull-left">
            <router-link :to="'/user/'+item.eid">
              <img v-lazy="item.avatar" :alt="item.nickname" class="header" />
            </router-link>
          </div>
          <div class="pull-left" style="width:85%;">
            <p class="retweet-title">
              <router-link
                style="width:85%;display: inline-block;"
                :to="'/'+ name +'/'+ item.id"
              >{{ item.title }}</router-link>
            </p>
            <p class="retweet-user">
              作者：
              <router-link :to="'/user/'+item.eid">{{ item.nickname }}</router-link>
            </p>
          </div>
        </div>
        <p class="re-summary">{{ item.summary }}</p>
        <div class="meta clearfix">
          <div class="infos pull-left">
            <span class="time">{{ item.create_time }}</span>
          </div>
          <el-badge class="item" v-show="hasDelete">
            <el-button @click="toDelete(item.id)" size="small">删除</el-button>
          </el-badge>
          <el-badge :value="item.commentNum" :max="99" class="item">
            <el-button @click="toComments(item.id)" size="small">评论</el-button>
          </el-badge>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import Like from "@/components/base/like/like";
import note from "@/models/note"
import guide from "@/models/guide"

export default {
  data () {
    return {
      name: '',
      topName: ''
    }
  },
  inject: ['reload'],
  props: [
    'list',
    'type',
    'hasDelete'
  ],
  components: {
    Like
  },
  methods: {
    toComments (id) {
      this.$router.push({ path: '/' + this.name + '/' + id + '?comments=1' })
    },
    async toDelete (id) {
      this.$confirm('此操作将永久删除该' +  this.topName + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res
        try {
          if(this.type === 100)
            res = await note.deleteNote(id)
          else if(this.type === 200)
            res = await guide.deleteGuide(id)
          console.log(res)
          this.$message.success(`${res.msg}`)
          setTimeout(() => {
            this.reload()
          }, 1000)
        } catch (error) {
          console.log(error)
          this.$message.error(error.data.msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  watch: {
    type () {
      if (this.type === 100) {
        this.name = 'note'
        this.topName = '游记'
      } else if (this.type === 200) {
        this.name = 'guide'
        this.topName = '攻略'
      }
    }
  },
  created () {
    if (this.type === 100) {
      this.name = 'note'
      this.topName = '游记'
    } else if (this.type === 200) {
      this.name = 'guide'
      this.topName = '攻略'
    }
  }
}
</script>
<style lang="scss" scoped>
.m-note-list {
  list-style: none;
  li {
    padding: 15px;
    margin-top: 37px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 3px rgba(232, 232, 232, 0.8);
    .list-avatar {
      width: 240px;
      height: 160px;
      margin-right: 15px;
      img {
        width: 240px;
        height: 160px;
        border-radius: 5px;
      }
    }
    .list-content {
      width: 510px;
      position: relative;
      .praise-box {
        position: absolute;
        width: 32px;
        height: 32px;
        text-align: center;
        top: 0;
        right: 0;
      }
      .retweet {
        .header {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          border-radius: 5px;
        }
        .retweet-title {
          line-height: 1.4;
          a {
            color: #696;
            font-size: 16px;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .retweet-user {
          color: #a4a4a4;
          margin-bottom: 0;
          a {
            color: #a4a4a4;
          }
        }
      }
      .re-summary {
        overflow: hidden;
        margin-top: 10px;
        height: 66px;
        line-height: 22px;
      }
      .meta {
        margin-top: 17px;
        .el-badge {
          float: right;
          margin-left: 30px;
        }
      }
    }
  }
  li:first-child {
    margin-top: 13px;
  }
}
</style>
