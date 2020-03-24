<template>
  <div class="page-index">
    <el-row>
      <el-col :span="24">
        <div class="recommend">
          <div class="title">
            <h2>当月推荐</h2>
          </div>
          <div class="nav">
            <ul>
              <li :class="[(idx+1)==month?'active':'']" v-for="(item,idx) in month_list" :key="idx">
                <router-link :to="item.target" @click.native="refresh">{{item.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="recommend-list">
            <h3>{{title}}</h3>
            <ul>
              <li v-for="(item,idx) in list" :key="idx">
                <router-link to>
                  <img :src="item.img" :alt="item.name" />
                </router-link>
                <p>
                  <router-link to class="attractions-name">{{item.name}}</router-link>
                  <span>2131位驿友关注</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      month_list: [{
        name: '1月',
        target: '/spot/m/1'
      }, {
        name: '2月',
        target: '/spot/m/2'
      }, {
        name: '3月',
        target: '/spot/m/3'
      }, {
        name: '4月',
        target: '/spot/m/4'
      }, {
        name: '5月',
        target: '/spot/m/5'
      }, {
        name: '6月',
        target: '/spot/m/6'
      }, {
        name: '7月',
        target: '/spot/m/7'
      }, {
        name: '8月',
        target: '/spot/m/8'
      }, {
        name: '9月',
        target: '/spot/m/9'
      }, {
        name: '10月',
        target: '/spot/m/10'
      }, {
        name: '11月',
        target: '/spot/m/11'
      }, {
        name: '12月',
        target: '/spot/m/12'
      }],
      title: '陪你去看油菜花',
      month: '',
      list: [{
        name: '杭州',
        img: 'http://qyimg.iqingyi.com/scene/da3a60f773992d387410bb7a1a3d86db.jpg!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }, {
        name: '坝美',
        img: 'http://qyimg.iqingyi.com/scene/35dd800df8fc070d.JPG!scenecover'
      }]
    }
  },
};
</script>

<style lang="scss">
.recommend {
  .title h2 {
    font-weight: 600;
    margin: 30px 23px 0;
    font-size: 28px;
    color: #333;
    line-height: 26px;
    text-align: center;
  }
  .nav {
    position: relative;
    padding: 40px 0 20px;
    overflow: hidden;
    cursor: auto;
    ul {
      font-size: 0;
      li {
        display: inline-block;
        box-sizing: border-box;
        font-size: 18px;
        white-space: normal;
        letter-spacing: normal;
        padding: 0 23px;
        width: 88.6px;
        text-align: center;
        color: #000;
        border-right: 1px solid #eee;
        list-style: none;
        a {
          color: #000;
          padding-bottom: 12px;
          border-color: #75a45d;
        }
      }
      li:first-child {
        border-left: 1px solid #eee;
      }
      li.active a {
        border-bottom: 3px solid #75a45d;
        color: #75a45d;
      }
    }
  }
  .recommend-list {
    position: relative;
    margin-top: 40px;
    min-height: 400px;
    h3 {
      text-align: center;
      font-size: 22px;
      color: #75a45d;
    }
    ul {
      margin-top: 40px;
      li {
        float: left;
        box-sizing: border-box;
        margin: 15px 25px 15px 0;
        background-color: #fff;
        border-radius: 5px;
        border: none;
        margin-bottom: 30px;
        margin-top: 0;
        width: 240px;
        height: 200px;
        box-shadow: none;
        a {
          color: #259;
          img {
            width: 240px;
            height: 160px;
            border-radius: 5px;
            margin-bottom: 5px;
            image-rendering: -moz-crisp-edges;
            image-rendering: -o-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
        p {
          .attractions-name {
            float: left;
            font-size: 16px;
            width: 120px;
            overflow: visible;
            white-space: normal;
            font-weight: 600;
            color: #75a45d;
            display: block;
            height: 20px;
          }
          span {
            max-width: 120px;
            overflow: visible;
            white-space: normal;
            float: right;
          }
        }
      }
    }
  }
}
</style>
