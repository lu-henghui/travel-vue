<template>
  <div class="page-index">
    <el-row>
      <el-col :span="18">
        <div class="s-main" v-if="list.scenics">
          <div class="top-info">
            <div class="clearfix">
              <h1 class="pull-left">{{ list.scenics.name }}</h1>
              <!-- <like :art_id="item.id" :type="type" :like_count="item.praise" :liked="item.liked" /> -->
            </div>
            <div class="attraction-img">
              <img v-lazy="list.scenics.image" :alt="list.scenics.name" />
            </div>
          </div>
          <div class="map-box clearfix">
            <div class="list-header">
              <p class="title">
                旅行地位置
                <a class="locked" href="javascript:;">激活地图</a>
              </p>
            </div>
            <div id="mapBox" class="spot-map-box">
              <amap v-bind:local="list.scenics.position" />
            </div>
          </div>
          <div class="attractions-list">
            <div class="list-header clearfix">
              <p class="title">周边旅游地</p>
            </div>
            <ul class="clearfix">
              <li v-for="(item, idx) in list.arounds" :key="idx">
                <router-link class="attractions-image" :to="'/scenics/'+item.id" :title="item.name">
                  <img v-lazy="item.image" :alt="item.name" />
                </router-link>
                <router-link class="attractions-name" :to="'/scenics/'+item.id" :title="item.name">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="article-list" >
            <div class="list-header clearfix">
              <p class="title">相关游记</p>
            </div>
            <ul class="clearfix" v-if="list.notes">
              <li v-for="(item, idx) in list.notes" :key="idx">
                <router-link class="article-image" :to="'/note/'+item.id" :title="item.title">
                  <img v-lazy="item.img" :alt="item.title" />
                </router-link>
                <router-link class="article-name" :to="'/note/'+item.id" :title="item.title">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
          <div class="article-list">
            <div class="list-header clearfix">
              <p class="title">相关攻略</p>
            </div>
            <ul class="clearfix">
              <li v-for="(item, idx) in list.guides" :key="idx">
                <router-link class="article-image" :to="'/guide/'+item.id" :title="item.title">
                  <img v-lazy="item.img" :alt="item.title" />
                </router-link>
                <router-link class="article-name" :to="'/guide/'+item.id" :title="item.title">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :offset="1" :span="5">
        <recommend />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Amap from '@/components/base/map/map'
import scenics from '@/models/scenics'
import Recommend from "@/components/public/recommend-list";

export default {
  inject: ['reload'],
  data () {
    return {
      list: {
        scenics: {
          // id: '',
          // name: '',
          // position: '',
          // image: '',
          // praise: '',
          // create_time: ''
        },
        arounds: [
          // {
          //   id: '',
          //   name: '',
          //   image: ''
          // }
        ],
        notes: [],
        guides: []
      }
    }
  },
  components: {
    Amap,
    Recommend
  },
  async created () {
    try {
      this.list = await scenics.getScenics(this.$route.params.id)
    } catch (error) {
      this.$message({
        showClose: true,
        message: error.data.msg,
        type: 'warning'
      });
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (to, from) {
      this.reload()
    }
  }
};
</script>
<style lang="scss">
.s-main {
  .top-info {
    margin-top: 20px;
    margin-bottom: 30px;
    h1 {
      font-size: 28px;
      color: #222;
    }
    span {
      display: inline-block;
      margin-left: 10px;
      font-size: 18px;
      color: #666;
      line-height: 30px;
      font-weight: 700;
      max-width: 280px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .attraction-img {
      margin-top: 7px;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }
  .map-box {
    margin-bottom: 5px;
    margin-top: 20px;
    .list-header p {
      font-weight: 700;
      font-size: 18px;
      a {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        white-space: nowrap;
        float: right;
        padding: 3px 12px;
        background: #75a43d;
        color: #fff;
        border: 1px solid #75a43d;
        border-radius: 4px;
      }
      .unlocked {
        color: #75a43d;
        background: #fff;
      }
    }
    .spot-map-box {
      position: relative;
      overflow: hidden;
      touch-action: none;
      width: 100%;
      height: 320px;
      margin: 10px 0;
      display: inline-block;
      .map-shade {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        cursor: default;
      }
    }
  }
  .attractions-list {
    margin-bottom: 5px;
    margin-top: 20px;
    .list-header p {
      float: left;
      font-size: 18px;
      font-weight: 700;
    }
    ul li {
      float: left;
      width: 180px;
      height: 140px;
      padding: 9px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      margin: 15px 19px 15px 0;
      background-color: #fff;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 1px 2px 4px rgba(232, 232, 232, 0.8);
      box-shadow: 1px 2px 4px rgba(232, 232, 232, 0.8);
      .attractions-image{
        display: flex;
        width: 160px;
        height: 94px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 94px;
          border-radius: 5px 5px 0 0;
        }
      }
      .attractions-name {
        display: flex;
        justify-content: center;
        width: 160px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #222;
      }
    }
  }
  .article-list {
    margin-bottom: 5px;
    margin-top: 20px;
    .list-header p {
      float: left;
      font-size: 18px;
      font-weight: 700;
    }
    ul li {
      float: left;
      width: 245px;
      padding: 12px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      margin: 15px 21px 15px 0;
      background-color: #fff;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 1px 2px 4px rgba(232, 232, 232, 0.8);
      box-shadow: 1px 2px 4px rgba(232, 232, 232, 0.8);
      .article-image{
        display: flex;
        margin-bottom: 10px;
        justify-content: center;
        img {
          width: 219px;
          height: 146px;
          border-radius: 5px 5px 0 0;
        }
      }
      .article-name {
        display: flex;
        width: 225px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #222;
      }
    }
  }
}
</style>