<template>
  <div class="m-geo">
    <i class="el-icon-location" />广州市
    <a href="/changeCity" class="changeCity">切换城市</a>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
.m-geo {
  color: #fff;
  line-height: 60px;
  padding-left: 40px;
  font-size: 14px;
  .changeCity {
    background: #f4f4f4;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    color: #666;
    margin: 0 4px;
    padding: 0 2px;

    &:hover {
      color: #31bbac;
    }
  }
}
</style>
