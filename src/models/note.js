import { post, get, _delete } from '@/lin/plugins/axios'
import { formatTime, formatText } from '@/utils'
import defaultAvatar from "@/assets/img/user/user.png";

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Note {
  constructor(page = 0, count = 10) {
    this.page = page
    this.count = count
  }

  async incresePage () {
    this.page += 1
  }

  async decresePage () {
    this.page -= 1
    if (this.page < 0) {
      this.page = 0
    }
  }

  /**
   * 获取相应页数的游记
   * @param {int} count 每页几条数据 
   * @param {int} page 第几页
   */
  async getNotes ({ count = this.count, page = this.page }) {
    let res
    res = await get('v1/note/notes', {
      count,
      page,
    })
    // console.log(res)
    res.items = formatData(res.items)
    // console.log(res)
    return res
  }

  /**
   * 获取相应页数的游记
   * @param {int} count 每页几条数据 
   * @param {int} page 第几页
   */
  async getLoginNotes ({ count = this.count, page = this.page }) {
    let res
    res = await get('v1/note/login/notes', {
      count,
      page,
    })
    // console.log(res)
    res.items = formatData(res.items)
    // console.log(res)
    return res
  }

  /**
   * 发布游记
   * @param {String} title 标题
   * @param {String} img 封面url
   * @param {Array} arounds 关联旅游地id数组
   * @param {String} text 发布内容
   */
  async addNote ({ title, img, arounds, text }) {
    const res = await post('v1/note', { title, img, arounds, text }, { handleError: true })
    return res
  }

  /**
   * 获取几个最火游记
   * @param {int} num 游记数量
   */
  async getHotNotes ({ num }) {
    let res = await post('v1/note/hotNotes', { num }, { handleError: true })
    return formatData(res)
  }

  /**
   * 获取几个最火游记
   * @param {int} num 游记数量
   */
  async getLoginHotNotes ({ num }) {
    let res = await post('v1/note/login/hotNotes', { num }, { handleError: true })
    return formatData(res)
  }
  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象

  /**
   * 根据ID获取游记
   * @param {int} id 游记ID值
   */
  async getNote (id) {
    let res = await get(`v1/note/${id}`, { handleError: true })
    // console.log(res)
    res.note = formatDetailData(res.note)
    return res
  }

  /**
   * 点赞
   * @param {int} art_id 游记ID
   * @param {int} type 类型ID
   */
  async like ({ art_id, type }) {
    let res = await post('v1/like/', { art_id, type }, { handleError: true })
    // console.log(res)
    return res
  }

  /**
   * 取消点赞
   * @param {int} art_id 游记ID
   * @param {int} type 类型ID
   */
  async dislike ({ art_id, type }) {
    let res = await post('v1/like/cancel', { art_id, type }, { handleError: true })
    console.log(res)
    return res
  }

  /**
   * 获取我的游记
   */
  async getMyNotes () {
    let res = await get('v1/note/myNotes', { handleError: true })
    return formatData(res)
  }

  /**
   * 搜索游记
   * @param {String} search 关键词
   */
  async getNoteByKeyword(search) {
    const res = await get('v1/note/search?q='+ search, { handleError: true })
    return formatData(res)
  }

  /**
   * 获取推荐游记
   */
  async getRecommendNotes() {
    const res = await get('v1/note/recommend', { handleError: true })
    return res
  }

  /**
   * 删除我的游记
   * @param {int} id 游记ID
   */
  async deleteNote (id) {
    const res = await _delete(`v1/note/myNotes/${id}`, { handleError: true })
    return res
  }
}


/**
 * 格式化游记 前台
 * @param {array} res 游记内容
 */
function formatData (res) {
  for (var i = 0; i < res.length; i++) {
    if ( !res[i].avatar ) {
      res[i].avatar = defaultAvatar
    }
    res[i].summary = formatText(res[i].text)
    res[i].create_time = formatTime(res[i].create_time)
  }
  return res
}

/**
 * 格式化游记 详细
 * @param {array} res 游记内容
 */
function formatDetailData (res) {
  if ( !res.avatar ) {
    res.avatar = defaultAvatar
  }
  res.create_time = formatTime1(res.create_time)

  return res
}

/**
 * 世界协调时间格式 转化为 日期格式
 * @param {date} time 日期
 */
function formatTime1 (time) {
  var d = new Date(time);
  var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return times;
}

export default new Note()
