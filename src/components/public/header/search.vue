<template>
  <div class="search-panel">
    <div class="wrapper">
      <el-input v-model="search" @focus="focus" @blur="blur" placeholder="搜索地名" />
      <button class="el-button el-button--primary">
        <i class="el-icon-search" />
      </button>
      <dl
        v-if="isHotPlace"
        class="hotPlace"
      >
        <dt>热门搜索</dt>
        <dd v-for="(item,idx) in hotPlace" :key="idx">
          {{ item }}
        </dd>
      </dl>
      <dl
        v-if="isSearchList"
        class="searchList"
      >
        <dd v-for="(item,idx) in searchList" :key="idx">
          {{ item }}
        </dd>
      </dl>
    </div>
    <!-- <p class="suggest">
      <a href="#">广州</a>
      <a href="#">广州</a>
      <a href="#">广州</a>
      <a href="#">广州</a>
      <a href="#">广州</a>
      <a href="#">广州</a>
    </p> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      isFocus: false,
      hotPlace: ['火锅', '火锅', '火锅'],
      searchList: ['火锅', '火锅', '火锅']
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      const self = this
      setTimeout(function () {
        self.isFocus = false
      }, 200)
    }
  }
}
</script>
<style lang="scss">
.search-panel {
  .wrapper {
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    top: 10px;
    white-space: nowrap;
    .el-input {
      width: 262px;
      input {
        border: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .el-button {
      position: relative;
      left: 0px;
      width: 88px;
      border: none;
      font-size: 16px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      i {
        font-weight: bold;
      }
    }
  }
  .hotPlace,
  .searchList {
    position: absolute;
    top: 41px;
    left: 0;
    background: #fff;
    padding: 10px;
    font-size: 12px;
    width: 262px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-top: none;
    z-index: 999;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    dt {
      color: #999;
      font-weight: bold;
    }

    dd {
      display: inline-block;
      color: #666;
      margin-right: 10px;
      margin-bottom: 3px;
      margin-top: 5px;
      cursor: pointer;

      &:hover {
        background: #f8f8f8;
        color: #31bbac;
      }
    }

    &.searchList {
      padding: 0;
      margin: 0;
      dd {
        margin: 0;
        padding: 3px 10px;
        display: block;
        line-height: 1.6;
      }
    }
  }
}
</style>
