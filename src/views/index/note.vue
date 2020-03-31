<template>
  <div class="m-note clearfix">
    <div class="m-note-main clearfix">
      <h2>
        <router-link to="/note">心醉游记</router-link>
      </h2>
    </div>
    <note :list="list" :type="type" :hasDelete="hasDelete" />
  </div>
</template>
<script>
import note from "@/models/note";
import Note from "@/components/public/article-list";

export default {
  data () {
    return {
      id: '',
      list: [],
      type: 100, // 游记类型为100
      hasDelete: false,
      note: {
        num: 3
      }
    };
  },
  async mounted () {
    this.init();
    if(this.id){
      this.list = await note.getLoginHotNotes(this.note);
    }else{
      // 获取最火的三篇游记
      this.list = await note.getHotNotes(this.note);
    }
  },
  components: {
    Note
  },
  methods: {
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.id = user.id;
      }
    },
  }
};
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
