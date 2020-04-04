<template>
  <div class="page-index">
    <el-row>
      <el-col :span="18">
        <div class="recommend">
          <div class="title">
            <h2>推荐景点</h2>
          </div>
          <scenics :list="list"  />
        </div>
      </el-col>
      <el-col :offset="1" :span="5">
        <recommend />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import scenics from "@/models/scenics";
import Scenics from "@/components/public/scenics-list"
import Recommend from "@/components/public/recommend-list";

export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    try {
      // 获取最火的三个旅游地
      this.list = await scenics.getAllScenics();
    } catch (error) {
      console.log(error);
      this.$message.error(error.data.msg);
    }
  },
  components: {
    Scenics,
    Recommend
  }
};
</script>

<style lang="scss">
.recommend {
  .title h2 {
    font-weight: 600;
    margin: 30px 23px 0;
    font-size: 28px;
    color: #333;
    line-height: 26px;
    text-align: center;
  }
}
</style>
