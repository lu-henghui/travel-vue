<template>
  <div>
    <router-link v-if="Liked" @click.native="dislike(art_id)" to="">
      <i class="iconfont icongood-fill"></i>
    </router-link>
    <router-link v-else @click.native="like(art_id)" to="">
      <i class="iconfont icongood"></i>
    </router-link>
    <span class="qty">{{ LikeCount }}</span>
  </div>
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
  watch: {
    // eslint-disable-next-line no-unused-vars
    like_count (newValue, oldValue){
      // console.log(newValue, oldValue) 
      this.LikeCount = newValue
    },
    // eslint-disable-next-line no-unused-vars
    liked (newValue, oldValue){
      // console.log(newValue, oldValue) 
      this.Liked = newValue
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
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  i {
    position: absolute;
    font-size: 24px;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
    color: #75a43b;;
  }
}
.qty {
  bottom: 50%;
  left: -300%;
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
</style>