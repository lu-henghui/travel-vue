<template>
  <div class="m-slide">
    <el-carousel trigger="click">
      <el-carousel-item v-for="(item,idx) in list" :key="idx">
        <div class="slide-text">
          <h3>{{ item.date }}</h3>
          <h3>{{ item.title }}</h3>
        </div>
        <img :src="item.img" :alt="item.title" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          url: "#",
          date: "30/Jan.2020",
          title: "没有疫情的武汉，长什么样子？",
          img:
            "http://qyimg.iqingyi.com/inpost/20200130/e3d192786567cc1a44f7627e66bca1f4.jpg!postplay"
        },
        {
          url: "#",
          date: "30/Jan.2020",
          title: "年前你会备哪些年货？嵊泗人都在晒这些，海岛像调色板",
          img:
            "http://qyimg.iqingyi.com/inpost/20200118/au2fpq9q9ky14sjt1vchhj7ivugxbsyg.jpg!postplay"
        },
        {
          url: "#",
          date: "30/Jan.2020",
          title: "将2019年的冬季留在北海道",
          img:
            "https://qyimg.iqingyi.com/inpost/20200106/dc0b19e6863a9d820fcc59a7abb65b4a.jpg!postplay"
        },
        {
          url: "#",
          date: "30/Jan.2020",
          title: "仙本那，潜水和跳岛的一周",
          img:
            "http://qyimg.iqingyi.com/inpost/20191230/b900469834a84a6ec851f5d26ac92780.jpg!postplay"
        }
      ]
    };
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
