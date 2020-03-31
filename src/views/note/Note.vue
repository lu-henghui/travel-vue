<template>
  <div class="page-index">
    <el-row>
      <el-col :span="19">
        <div class="m-note clearfix">
          <div class="m-note-main clearfix">
            <h2>
              <router-link to="/note">心醉游记</router-link>
            </h2>
          </div>
          <note :list="list" :type="type" :hasDelete="hasDelete" />
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
        <router-link to="/editor?type=note">发布游记</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import note from "@/models/note";
import Note from "@/components/public/article-list";

export default {
  data () {
    return {
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      total_nums: 0, // 分组内的游记总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      list: [],
      type: 100, // 游记类型为100
      hasDelete: false
    };
  },
  methods: {
    // 根据页数获取游记
    async getAllNotes() {
      let res
      const currentPage = this.currentPage - 1
      try {
        if(this.id){
          res = await note.getLoginNotes({ count: this.pageCount, page: currentPage });
        }else{
          res = await note.getNotes({ count: this.pageCount, page: currentPage });
        }
        this.list = [...res.items]
        // console.log(this.list)
        this.total_nums = res.total
      } catch (e) {
        console.log(e)
      }
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      // this.loading = true
      await this.getAllNotes('changePage')
      // this.loading = false
    },
    // 监听添加游记是否成功
    async addNote(flag) {
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
    await this.getAllNotes()
  },
  components: {
    Note
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
