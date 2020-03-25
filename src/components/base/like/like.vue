<template>
  <router-link v-if="Liked" @click.native="dislike(art_id)" to="">
    <i class="iconfont iconbad-fill"></i>
    <span class="qty">{{ LikeCount }}</span>
  </router-link>
  <router-link v-else @click.native="like(art_id)" to="">
    <i class="iconfont icongood-fill"></i>
    <span class="qty">{{ LikeCount }}</span>
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
      // ArtId: this.art_id,
      // Type: this.type,
      LikeCount: this.like_count,
      Liked: this.liked
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
        this.LikeCount++;
        this.Liked = true;
      } catch (error) {
        // this.$message.error(error.data.msg);
        console.log(error);
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
        this.LikeCount--;
        this.Liked = false;
      } catch (error) {
        // this.$message.error(error.data.msg);
        console.log(error);
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
  i {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 63%;
    left: 50%;
    margin: -9px 0 0 -8px;
    z-index: 1;
    color: #fff;
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