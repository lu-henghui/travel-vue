<template>
  <div class="page-index">
    <el-row>
      <el-col :span="18">
        <div class="recommend">
          <div class="title">
            <h2>推荐景点</h2>
          </div>
          <el-cascader
            size="large"
            :options="options"
            @change="handleChange"
          ></el-cascader>
          <span v-show="error">{{error}}</span>
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
import {
  CodeToText,
  // TextToCode
} from "element-china-area-data/dist/app.js";
import { provinceAndCityData } from "element-china-area-data";

export default {
  data() {
    return {
      list: [],
      options: provinceAndCityData,
    }
  },
  async mounted() {
    try {
      // 获取全部景点
      this.list = await scenics.getAllScenics();
    } catch (error) {
      console.log(error);
      this.$message.error(error.data.msg);
    }
  },
  components: {
    Scenics,
    Recommend
  },
  methods: {
    async handleChange(value) {
      this.list = '';
      const position = CodeToText[value[0]] + ' ' + CodeToText[value[1]];
      try {
        // 根据地点获取景点
        this.list = await scenics.getScenicsByPosition(position);
      } catch (error) {
        // console.log(error)
        this.$message({
          showClose: true,
          message: error.data.msg,
          type: 'warning'
        });
      }
    },
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
