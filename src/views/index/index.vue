<template>
  <div class="page-index">
    <el-row>
      <el-col :span="24">
        <slide />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <scenics />
        <note />
        <guide />
      </el-col>
      <el-col :offset="1" :span="5">
        <recommend />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slide from "@/views/index/slide";
import Scenics from "@/views/index/scenics";
import Note from "@/views/index/note";
import Guide from "@/views/index/guide";
import Recommend from "@/components/public/recommend-list";

export default {
  components: {
    Slide,
    Scenics,
    Note,
    Guide,
    Recommend
  }
};
</script>
<style lang="scss">
.page-index {
  position: relative;
  margin-top: 10px;
}
</style>
