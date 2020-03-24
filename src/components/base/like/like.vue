<template>
  <router-link v-if="liked" @click.native="dislike(art_id)" to="">
    <img src="http://www.iqingyi.com/static/common/images/praise.png" alt />
    <span class="qty">{{ like_count }}</span>
  </router-link>
  <router-link v-else @click.native="like(art_id)" to="">
    <img src="http://www.iqingyi.com/static/common/images/praise.png" alt />
    <span class="qty">{{ like_count }}</span>
  </router-link>
</template>
<script>
import note from "@/models/note";

export default {
  props: [
    'art_id', // 类型ID
    'type', // 类型
    'like_count', // 点赞数
    'liked' // 是否点赞
  ],
  data () {
    return {
    }
  },
  methods: {
    /**
     * 点赞
     */
    async like (id) {
      try {
        const res = await note.like({ art_id: id, type: this.type });
        // console.log(res);
        this.$message.success(res.msg);
        this.like_count++;
        this.liked = true;
      } catch (error) {
        this.$message.error(error.data.msg);
        // console.log(error);
      }
    },
    /**
     * 取消点赞
     */
    async dislike (id) {
      try {
        const res = await note.dislike({ art_id: id, type: this.type });
        // console.log(res);
        this.$message.success(res.msg);
        this.like_count--;
        this.liked = false;
      } catch (error) {
        this.$message.error(error.data.msg);
        // console.log(error);
      }
    },
  }
}
</script>
<style lang="scss" scoped>
a {
  margin-top: 6.7%;
  width: 100%;
  height: 100%;
  display: inline-block;
  line-height: 50%;
  position: relative;
  border-radius: 2px;
  background: #75a43b;
  img {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin: -9px 0 0 -8px;
    z-index: 1;
  }
  .qty {
    bottom: 50%;
    left: -330%;
    margin: 0 0 -10px;
    width: 300%;
    white-space: nowrap;
    line-height: 20px;
    text-align: right;
    transition: color 0.5s;
    position: absolute;
    color: #75a43b;
    font-size: 14px;
    font-weight: 700;
    height: 20px;
    display: inline-block;
  }
}
</style>