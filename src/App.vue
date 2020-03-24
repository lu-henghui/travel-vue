<template>
  <div id="app"><router-view /></div>
</template>

<script>
// import MyHeader from '@/components/public/header/index.vue'
// import MyFooter from '@/components/public/footer/index.vue'
// import MyMain from '@/views/index/index.vue'
import { mapActions } from 'vuex'
import Vue from 'vue'

export default {
  data() {
    return {
      timer: null,
      eventBus: new Vue(),
    }
  },
  mounted() {
    // document.getElementById('loader').style.display = 'none'
  },
  provide() {
    // eventBus挂载的事件： addGroup addUser
    return {
      eventBus: this.eventBus,
    }
  },
  methods: {
    ...mapActions(['loginOut']),
  },
}
</script>

<style>
.layout-blank {
  background-color: #fff;
  color: #2e2f30;
  letter-spacing: 0.5px;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  height: 100vh;
  margin: 0;
}
.pull-left {
  float: left !important;
}

.pull-right {
  float: right !important;
}
</style>
