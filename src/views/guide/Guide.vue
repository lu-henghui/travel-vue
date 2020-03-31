<template>
  <div class="page-index">
    <el-row>
      <el-col :span="19">
        <div class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to="/guide">最佳攻略</router-link>
            </h2>
          </div>
          <guide :list="list" :type="type" :hasDelete="hasDelete" />
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :background="true"
              :page-size="pageCount"
              :current-page="currentPage"
              v-if="refreshPagination"
              layout="prev, pager, next, jumper"
              :total="total_nums"
            ></el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <router-link to="/editor?type=guide">发布攻略</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import guide from "@/models/guide";
import Guide from "@/components/public/article-list";

export default {
  data () {
    return {
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的攻略总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      list: [],
      type: 200, // 攻略类型为200
      hasDelete: false
    };
  },
  methods: {
    // 根据页数获取游记
    async getAllGuides() {
      let res
      const currentPage = this.currentPage - 1
      try {
        if(this.id){
          res = await guide.getLoginGuides({ count: this.pageCount, page: currentPage });
        }else{  
          res = await guide.getGuides({ count: this.pageCount, page: currentPage });
        }
        this.list = [...res.items]
        console.log(this.list)
        this.total_nums = res.total
      } catch (e) {
        console.log(e)
      }
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      // this.loading = true
      await this.getAllGuides('changePage')
      // this.loading = false
    },
    // 监听添加游记是否成功
    async addGuide(flag) {
      if (flag === true) {
        if (this.total_nums % this.pageCount === 0) {
          // 判断当前页的数据是不是满了，需要增加新的页码
          this.currentPage++
        }
        // await this.getAdminUsers()
        this.refreshPagination = false // 刷新pagination组件
        this.$nextTick(() => {
          this.refreshPagination = true
        })
      }
    },
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.id = user.id;
      }
    },
  },
  async created() {
    this.init();
    await this.getAllGuides()
  },
  components: {
    Guide
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
        width: 530px;
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
          .el-badge{
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
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
</style>