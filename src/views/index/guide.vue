<template>
  <div class="m-note clearfix">
    <div class="m-note-main clearfix">
      <h2>
        <router-link to="/guide">最佳攻略</router-link>
      </h2>
    </div>
    <guide :list="list" :type="type" />
  </div>
</template>
<script>
import guide from "@/models/guide";
import Guide from "@/components/public/article-list";

export default {
  data () {
    return {
      id: '',
      list: [],
      type: 200, // 攻略类型为200
      guide: {
        num: 3
      }
    };
  },
  async mounted () {
    this.init();
    if(this.id){
      this.list = await guide.getLoginHotGuides(this.guide);
    }else{
      // 获取最火的三篇攻略
      this.list = await guide.getHotGuides(this.guide);
    }
  },
  components: {
    Guide
  },
  methods: {
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.id = user.id;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.m-note {
  margin-top: 30px;
  .m-note-main h2 {
    float: left;
    font-size: 18px;
    font-weight: 700;
    a {
      color: #333;
    }
  }
}
</style>