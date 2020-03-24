<template>
  <div class="m-note clearfix">
    <div class="m-note-main clearfix">
      <h2>
        <a href>心醉游记</a>
      </h2>
    </div>
    <ul class="m-note-list clearfix">
      <li v-for="(item,idx) in list" :key="idx" class="clearfix">
        <div class="list-avatar pull-left">
          <router-link :to="'/note/'+item.id">
            <img :src="item.img" :alt="item.title" />
          </router-link>
        </div>
        <div class="list-content pull-left">
          <div class="praise-box">
            <like :art_id="item.id" :type="type" :like_count="item.praise" :liked="item.liked" />
          </div>
          <div class="retweet clearfix">
            <div class="pull-left">
              <router-link :to="'/user/'+item.eId">
                <img :src="item.avatar" :alt="item.nickname" class="header" />
              </router-link>
            </div>
            <div class="pull-left" style="width:85%;">
              <p class="retweet-title">
                <router-link
                  style="width:90%;display: inline-block;"
                  :to="'/note/'+item.id"
                >{{ item.title }}</router-link>
              </p>
              <p class="retweet-user">
                作者：
                <router-link :to="'/user/'+item.eId">{{ item.nickname }}</router-link>
              </p>
            </div>
          </div>
          <p class="re-summary">{{ item.summary }}</p>
          <div class="meta clearfix">
            <div class="infos pull-left">
              <span class="time">{{ item.create_time }}</span>
            </div>
            <div class="ops pull-right">
              <a href>
                收藏(
                <span>0</span>)
              </a>
              <a href>
                评论(
                <span>1</span>)
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import note from "@/models/note";
import Like from "@/components/base/like/like";

export default {
  data () {
    return {
      list: [],
      note: {
        num: 3
      }
    };
  },
  async mounted () {
    // 获取最火的三篇游记
    this.list = await note.getHotNotes(this.note);
  },
  components: {
    Like
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
  .m-note-list {
    list-style: none;
    li {
      padding: 15px;
      margin-top: 37px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 1px 2px 3px rgba(232, 232, 232, 0.8);
      .list-avatar {
        width: 240px;
        height: 160px;
        margin-right: 15px;
        img {
          width: 240px;
          height: 160px;
          border-radius: 5px;
        }
      }
      .list-content {
        width: 530px;
        position: relative;
        .praise-box {
          position: absolute;
          width: 32px;
          height: 32px;
          text-align: center;
          top: 0;
          right: 0;
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
        }
        .retweet {
          .header {
            width: 50px;
            height: 50px;
            margin-right: 15px;
            border-radius: 5px;
          }
          .retweet-title {
            line-height: 1.4;
            a {
              color: #696;
              font-size: 16px;
              font-weight: 700;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .retweet-user {
            color: #a4a4a4;
            margin-bottom: 0;
            a {
              color: #a4a4a4;
            }
          }
        }
        .re-summary {
          overflow: hidden;
          margin-top: 10px;
          height: 66px;
          line-height: 22px;
        }
        .meta {
          margin-top: 17px;
          .ops {
            overflow: hidden;
            a {
              color: #a4a4a4;
              margin-left: 6px;
              position: relative;
              padding-left: 16px;
              float: left;
              line-height: 16px;
              height: 16px;
              margin-right: 16px;
            }
          }
        }
      }
    }
    li:first-child {
      margin-top: 13px;
    }
  }
}
</style>
