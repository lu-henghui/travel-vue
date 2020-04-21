<template>
  <div>
    <div class="m-note-main clearfix">
      <h2>推荐热点</h2>
    </div>
    <ul class="m-re-list clearfix">
      <li v-for="(item,nidx) in nlist" :key="'n'+nidx" class="clearfix">
        <router-link :to="'/note/'+ item.id"><img v-lazy="item.img" :alt="item.title"></router-link>
        <router-link :to="'/note/'+ item.id">{{item.title}}</router-link>
      </li>
      <li v-for="(item,gidx) in glist" :key="'g'+gidx" class="clearfix">
        <router-link :to="'/guide/'+ item.id"><img v-lazy="item.img" :alt="item.title"></router-link>
        <router-link :to="'/guide/'+ item.id">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import note from "@/models/note"
import guide from "@/models/guide"

export default {
  data () {
    return {
      nlist: [],
      glist: [],
    }
  },
  inject: ['reload'],
  components: {

  },
  methods: {
    async init() {
      try {
        const res = await note.getRecommendNotes()
        console.log(res)
        this.nlist = res
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await guide.getRecommendGuides()
        console.log(res)
        this.glist = res
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
  },
  async created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.m-re-list {
  list-style: none;
  li {
    margin-top: 25px;
    // width: 240px;
    // height: 160px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    img{
      border-radius: 5px;
      width: 240px;
      height: 160px;
      display: inline-block;
    }
    a{
      font-size: 14px;
      line-height: 1.4;
      display: inline-block;
      width: 100%;
      color: #333;
    }
  }
  li:first-child {
    margin-top: 13px;
  }
}
.m-note-main h2 {
  margin-top: 20px;
  float: left;
  font-size: 18px;
  font-weight: 700;
  a {
    color: #333;
  }
}
</style>
