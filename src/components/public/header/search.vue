<template>
  <div class="search-panel">
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="类型">
        <el-option label="全部" value="0"></el-option>
        <el-option label="景点" value="1"></el-option>
        <el-option label="游记" value="2"></el-option>
        <el-option label="攻略" value="3"></el-option>
        <el-option label="用户" value="4"></el-option>
      </el-select>
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
<script>

export default {
  data () {
    return {
      input: '',
      select: ''
    }
  },
  methods: {
    search () {
      if(!this.select){
        this.$notify({
          title: '提示',
          message: '你没有选择类型',
          type: 'warning',
          offset: 44
        });
      }else if(!this.input){
        this.$notify({
          title: '提示',
          message: '请填入搜索内容',
          type: 'warning',
          offset: 44
        });
      }else{
        this.$router.push({ path: '/search?q=' + this.input + '&type=' + this.select })
      }
    }
  }
}
</script>
<style lang="scss">
.search-panel {
  line-height: 60px;
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
