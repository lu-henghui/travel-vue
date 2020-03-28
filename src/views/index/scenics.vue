<template>
  <div class="m-spot clearfix">
    <div class="m-spot-main clearfix">
      <h2>
        <a href>推荐景点</a>
      </h2>
    </div>
    <scenics :list="list"  />
  </div>
</template>
<script>
import scenics from "@/models/scenics";
import Scenics from "@/components/public/scenics-list"

export default {
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    try {
      // 获取最火的三个旅游地
      this.list = await scenics.getHotScenics();
    } catch (error) {
      console.log(error);
      this.$message.error(error.data.msg);
    }
  },
  methods: {},
  components: {
    Scenics
  }
};
</script>
<style lang="scss" scoped>
.m-spot {
  margin-top: 40px;
  margin-bottom: 5px;
  .m-spot-main {
    h2 {
      float: left;
      font-size: 18px;
      font-weight: 700;
      a {
        color: #333;
      }
    }
  }
}
</style>
