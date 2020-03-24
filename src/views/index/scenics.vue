<template>
  <div class="m-spot clearfix">
    <div class="m-spot-main clearfix">
      <h2>
        <a href>推荐景点</a>
      </h2>
    </div>
    <ul class="m-spot-list clearfix">
      <li v-for="(item,idx) in list.slice(0,3)" :key="idx">
        <router-link :to="'/scenics/'+item.id">
          <img :src="item.image" :alt="item.name" />
          <p class="m-spot-title">{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import scenics from "@/models/scenics";
export default {
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    // 获取最火的三个旅游地
    this.list = await scenics.getAllScenics();
  },
  methods: {}
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
  .m-spot-list {
    margin-top: 15px;
    list-style: none;
    li {
      width: 240px;
      float: left;
      list-style: none;
      margin-left: 50px;
      a {
        display: block;
        overflow: hidden;
        color: #333;
        text-decoration: none;
        img {
          border-radius: 5px;
          width: 240px;
          height: 160px;
          display: inline-block;
        }
        p {
          text-align: center;
        }
      }
    }
    li:first-child {
      margin-left: 0px;
    }
  }
}
</style>
