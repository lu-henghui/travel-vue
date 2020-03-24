import { post, get, put, _delete } from '@/lin/plugins/axios'
import config from '@/config'
import { formatTime, formatText } from '@/utils'
import defaultAvatar from "@/assets/img/user/user.png";

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Guide {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addGuide (info) {
    const res = await post('v1/guide', info, { handleError: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象

  /**
   * 根据ID获取攻略
   * @param {int} id 攻略ID值
   */
  async getGuide (id) {
    const res = await get(`v1/guide/${id}`)
    // console.log(res)
    return formatDetailData(res)
  }

  async editGuide (id, info) {
    const res = await put(`v1/guide/${id}`, info)
    return res
  }

  async delectGuide (id) {
    const res = await _delete(`v1/guide/${id}`)
    return res
  }

  /**
   * 获取所有攻略
   */
  // async getGuides () {
  //   let res = await get('v1/guide/')
  //   for (var i = 0; i < res.length; i++) {
  //     if (res[i].avatar) {
  //       res[i].avatar = config.baseURL + 'assets/' + res[i].avatar
  //     }
  //   }
  //   return res
  // }

  /**
   * 获取相应页数的攻略
   * @param {int} count 每页几条数据 
   * @param {int} page 第几页
   */
  async getGuides ({ count = this.count, page = this.page }) {
    let res
    res = await get('v1/guide/guides', {
      count,
      page,
    })
    console.log(res)
    res.items = formatData(res.items)
    // console.log(res)
    return res
  }
}

/**
 * 格式化游记 前台
 * @param {array} res 游记内容
 */
function formatData (res) {
  for (var i = 0; i < res.length; i++) {
    if (res[i].avatar && res[i].avatar.indexOf('http') < 0) {
      res[i].avatar = config.baseURL + 'assets/' + res[i].avatar
    }else{
      res[i].avatar = defaultAvatar
    }
    if (res[i].img.indexOf('http') < 0) {
      res[i].img = config.baseURL + 'assets/' + res[i].img
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
  if (res.avatar && res.avatar.indexOf('http') < 0) {
    res.avatar = config.baseURL + 'assets/' + res.avatar
  }else{
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

export default new Guide()
