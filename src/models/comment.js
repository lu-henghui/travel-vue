import { post, get } from '@/lin/plugins/axios'
import config from '@/config'
import defaultAvatar from "@/assets/img/user/user.png";
import dayjs from 'dayjs';

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Comment {

  /**
   * 根据ID获取文章评论
   * @param {int} id 文章ID值
   * @param {int} type 类型
   */
  async getCommentInfo (id, type) {
    const comments = await get(`v1/comment/${id}`, {
      type
    })
    for (var i = 0; i < comments.length; i++) {
      for (var j = 0; j < comments[i].reply.length; j++) {
        comments[i].reply[j].time = dateStr(dayjs(comments[i].reply[j].time).valueOf());
        comments[i].reply[j].fromHeadImg = filterAvater(comments[i].reply[j].fromHeadImg);
        comments[i].reply[j].inputShow = false;
      }
      comments[i].time = dateStr(dayjs(comments[i].time).valueOf());
      comments[i].headImg = filterAvater(comments[i].headImg);
      comments[i].inputShow = false;
    }
    return comments
  }

  /**
   * 发表评论
   * @param {int} owner_id 文章ID
   * @param {int} type 类型
   * @param {String} comment 评论内容
   */
  async sendComment({ owner_id, type, comment }){
    const res = await post('v1/comment/sendComment', { owner_id, type, comment }, { handleError: true })
    return res
  }

  /**
   * 
   * @param {int} commentId 评论ID
   * @param {int} toId 回复用户ID
   * @param {String} toName 回复用户名字
   * @param {String} comment 回复评论内容
   */
  async sendCommentReply({ commentId, toId, toName, comment }){
    const res = await post('v1/comment/sendReply', { commentId, toId, toName, comment }, { handleError: true })
    return res
  }
}

/**
 * 格式化时间
 * @param {String} date 时间戳
 */
function dateStr (date) {
  // 获取js 时间戳
  var time = new Date().getTime();
  // 去掉 js 时间戳后三位，与php 时间戳保持一致
  time = parseInt((time - date) / 1000);
  // 存储转换值
  var s;
  if (time < 60 * 10) { // 十分钟内
    return '刚刚';
  } else if ((time < 60 * 60) && (time >= 60 * 10)) {
    // 超过十分钟少于1小时
    s = Math.floor(time / 60);
    return s + '分钟前';
  } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    // 超过1小时少于24小时
    s = Math.floor(time / 60 / 60);
    return s + '小时前';
  } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
    // 超过1天少于30天内
    s = Math.floor(time / 60 / 60 / 24);
    return s + '天前';
  } else {
    // 超过30天ddd
    date = new Date(parseInt(date));
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  }
}

/**
 * 格式化头像url
 * @param {String} image 头像url
 */
function filterAvater(image){
  if(image){
    if ( image.indexOf('http') >= 0) {
      return image
    }else  {
      return config.baseURL + 'assets/' + image
    }
  }
  else {
    return defaultAvatar
  }
}

export default new Comment()
