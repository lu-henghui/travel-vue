<template>
  <div class="page-index">
    <el-row>
      <el-col :span="19">
        <div class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <a href>最佳攻略</a>
            </h2>
          </div>
          <ul class="m-note-list clearfix">
            <li v-for="(item,idx) in list" :key="idx" class="clearfix">
              <div class="list-avatar pull-left">
                <router-link :to="'/guide/'+item.id">
                  <img :src="item.img" :alt="item.title" />
                </router-link>
              </div>
              <div class="list-content pull-left">
                <div class="praise-box">
                  <like :art_id="item.id" :type="type" :like_count="item.praise" :liked="item.liked" />
                </div>
                <div class="retweet clearfix">
                  <div class="pull-left">
                    <router-link :to="'/user/'+item.eId">
                      <img :src="item.avatar" :alt="item.nickname" class="header" />
                    </router-link>
                  </div>
                  <div class="pull-left" style="width:85%;">
                    <p class="retweet-title">
                      <router-link style="width:85%;display: inline-block;" :to="'/guide/'+item.id">
                        {{ item.title }}
                      </router-link>
                    </p>
                    <p class="retweet-user">
                      作者：
                      <router-link :to="'/user/'+item.eId">{{ item.nickname }}</router-link>
                    </p>
                  </div>
                </div>
                <p class="re-summary">{{ item.summary }}</p>
                <div class="meta clearfix">
                  <div class="infos pull-left">
                    <span class="time">{{ item.create_time }}</span>
                  </div>
                  <el-badge :value="200" :max="99" class="item">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                  <el-badge :value="100" :max="10" class="item">
                    <el-button size="small">回复</el-button>
                  </el-badge>
                </div>
              </div>
            </li>
          </ul>
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
import Like from "@/components/base/like/like";

export default {
  data () {
    return {
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的攻略总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      list: [],
      type: 200, // 攻略类型为200
    };
  },
  methods: {
    // 根据页数获取游记
    async getAllGuides() {
      let res
      const currentPage = this.currentPage - 1
      try {
        res = await guide.getGuides({ count: this.pageCount, page: currentPage });
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
  },
  async created() {
    await this.getAllGuides()
  },
  components: {
    Like
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