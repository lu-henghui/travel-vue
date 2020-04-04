<template>
  <div class="m-slide">
    <el-carousel trigger="click">
      <el-carousel-item v-for="(item,idx) in list" :key="idx">
        <router-link :to="item.url">
          <div class="slide-text">
            <h3>{{ item.date }}</h3>
            <h3>{{ item.title }}</h3>
          </div>
          <img :src="item.img" :alt="item.title" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import banner from "@/models/banner";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async init() {
      this.list = await banner.getBanners()
    }
  },
  async created() {
    this.init()
  }
};
</script>
<style lang="scss">
.m-slide {
  height: 475px;
  margin: 10px;
  .el-carousel__container {
    height: 475px;
  }
  img {
    height: 475px;
  }
  .el-carousel__item {
    h3 {
      color: #fff;
      font-size: 24px;
      margin: 0;
    }
    .slide-text {
      position: absolute;
      top: 35px;
      left: 40px;
    }
  }
}
</style>
