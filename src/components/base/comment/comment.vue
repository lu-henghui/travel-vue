<template>
  <div class="comment-main clearfix">
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply" id="comments">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info">
        <div
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        ></div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
      </div>
    </div>
    <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
      <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{item.name}}</span>
        <span class="author-time">{{item.time}}</span>
      </div>
      <div class="icon-btn">
        <span @click="showReplyInput(i,item.name,item.id)">
          <i class="iconfont el-icon-s-comment"></i>回复
        </span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{item.comment}}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
          <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
          <div class="author-info">
            <span class="author-name">{{reply.fromName}}</span>
            <span class="author-time">{{reply.time}}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i,reply.fromName,item.id)">
              <i class="iconfont el-icon-s-comment"></i>回复
            </span>
          </div>
          <div class="talk-box">
            <p>
              <span class="replyName">回复 {{reply.toName}}:</span>
              <span class="reply">{{reply.comment}}</span>
            </p>
          </div>
          <div class="reply-box"></div>
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info">
          <div
            tabindex="0"
            contenteditable="true"
            spellcheck="false"
            placeholder="输入评论..."
            @input="onDivInput($event)"
            class="reply-input reply-comment-input"
          ></div>
        </div>
        <div class="reply-btn-box">
          <el-button
            class="reply-btn"
            size="medium"
            @click="sendCommentReply(i,j)"
            type="primary"
          >发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from '@/models/comment'

const clickoutside = {
  // 初始化指令
  // eslint-disable-next-line no-unused-vars
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update () { },
  // eslint-disable-next-line no-unused-vars
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: 'ArticleComment',
  props: [
    'type'
  ],
  inject: ['reload'],
  data () {
    return {
      btnShow: false,
      index: '0',
      replyComment: '',
      myName: '',
      myHeader: '',
      myId: '',
      to: '',
      toId: -1,
      comments: []
    }
  },
  async created () {
    this.init();
    this.comments = await comment.getCommentInfo(this.$route.params.id, this.type)
  },
  directives: { clickoutside },
  methods: {
    inputFocus () {
      var replyInput = document.getElementById('replyInput');
      replyInput.style.padding = "8px 8px"
      replyInput.style.border = "2px solid blue"
      replyInput.focus()
    },
    showReplyBtn () {
      this.btnShow = true
    },
    hideReplyBtn () {
      this.btnShow = false
      // eslint-disable-next-line no-undef
      replyInput.style.padding = "10px"
      // eslint-disable-next-line no-undef
      replyInput.style.border = "none"
    },
    showReplyInput (i, name, id) {
      this.comments[this.index].inputShow = false
      this.index = i
      this.comments[i].inputShow = true
      this.to = name
      this.toId = id
    },
    _inputShow (i) {
      return this.comments[i].inputShow
    },
    async sendComment () {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        a.owner_id = this.$route.params.id
        a.type = this.type
        a.id = this.myId
        a.name = this.myName
        a.comment = this.replyComment
        a.headImg = this.myHeader
        const res = await comment.sendComment(a)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          setTimeout(() => {
            this.reload()
          }, 1000)
        }else {
          console.log('error!!')
          this.$message.error(`${res.msg}`)
        }  
      }
    },
    // eslint-disable-next-line no-unused-vars
    async sendCommentReply (i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        let a = {}
        a.commentId = this.toId
        a.fromName = this.myName
        a.toId = this.toId
        a.toName = this.to
        a.fromHeadImg = this.myHeader
        a.comment = this.replyComment
        try { 
          await comment.sendCommentReply(a)
          this.$message({
            showClose: true,
            type: 'success',
            message: '发表成功'
          })
          setTimeout(() => {
            this.reload()
          }, 1000)
        } catch (error) {
          console.log(error)
          this.$message.error(error.data.msg);
        }
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML;
    },
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.myName = user.nickname;
        this.myHeader = user.avatar;
        this.myId = user.id;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.comment-main{
  float: left;
  width: 100%;
  .my-reply {
    padding: 10px;
    background-color: #fafbfc;
    .header-img {
      display: inline-block;
      vertical-align: top;
    }
    .reply-info {
      display: inline-block;
      margin-left: 5px;
      width: 90%;
      @media screen and (max-width: 1200px) {
        width: 80%;
      }
      .reply-input {
        min-height: 20px;
        line-height: 22px;
        padding: 10px 10px;
        color: #333;
        background-color: #fff;
        border-radius: 5px;
        &:empty:before {
          content: attr(placeholder);
        }
        &:focus:before {
          content: none;
        }
        &:focus {
          padding: 8px 8px;
          border: 2px solid blue;
          box-shadow: none;
          outline: none;
        }
      }
    }
    .reply-btn-box {
      height: 25px;
      margin: 10px 0;
      .reply-btn {
        position: relative;
        float: right;
        margin-right: 15px;
      }
    }
  }
  .my-comment-reply {
    margin-left: 50px;
    .reply-input {
      width: flex;
    }
  }
  .author-title:not(:last-child) {
    border-bottom: 1px solid rgba(178, 186, 194, 0.3);
  }
  .author-title {
    padding: 10px;
    .header-img {
      display: inline-block;
      vertical-align: top;
    }
    .author-info {
      display: inline-block;
      margin-left: 5px;
      width: 60%;
      height: 40px;
      line-height: 20px;
      > span {
        display: block;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .author-name {
        color: #000;
        font-size: 18px;
        font-weight: bold;
      }
      .author-time {
        font-size: 14px;
      }
    }
    .icon-btn {
      width: 30%;
      padding: 0 !important ;
      float: right;
      @media screen and (max-width: 1200px) {
        width: 20%;
        padding: 7px;
      }
      > span {
        cursor: pointer;
      }
      .iconfont {
        margin: 0 5px;
      }
    }
    .talk-box {
      margin: 0 50px;
      > p {
        margin: 0;
      }
      .replyName{
        color: #888;
        font-size: 14px;
        line-height: 1.4;
      }
      .reply {
        font-size: 16px;
        color: #222;
        line-height: 1.4;
      }
    }
    .reply-box {
      margin: 10px 0 0 50px;
      background-color: #efefef;
    }
  }
}
</style>
