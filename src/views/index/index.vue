<template>
  <div class="page-index">
    <el-row>
      <el-col :span="24">
        <slide />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19">
        <scenics />
        <note />
        <guide />
      </el-col>
      <el-col :span="5" />
    </el-row>
  </div>
</template>

<script>
import Slide from "@/views/index/slide";
import Scenics from "@/views/index/scenics";
import Note from "@/views/index/note";
import Guide from "@/views/index/guide";
export default {
  components: {
    Slide,
    Scenics,
    Note,
    Guide
  }
};
</script>
<style lang="scss">
.page-index {
  position: relative;
  margin-top: 10px;
}
</style>
