<template>
  <ul class="m-spot-list clearfix">
    <li v-for="(item,idx) in list" :key="idx">
      <router-link :to="'/scenics/'+item.id">
        <img v-lazy="item.image" :alt="item.name" />
        <p class="m-spot-title">{{ item.name }}</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: [
    'list'
  ]
}
</script>
<style lang="scss" scoped>
.m-spot-list {
  margin-top: 15px;
  list-style: none;
  li {
    width: 240px;
    float: left;
    list-style: none;
    margin-right: 25px;
    margin-bottom: 20px;
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
        font-size: 16px;
        padding: 5px;
      }
    }
  }
  li:first-child {
    margin-left: 0px;
  }
}
</style>