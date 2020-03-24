import { post, get, put, _delete } from '@/lin/plugins/axios'
import { saveTokens } from '@/lin/utils/token'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class User {
  // constructor() {}

  /**
   * 邮箱验证
   * @param {object} data 验证信息
   */
  async verify (data) {
    const res = await post('v1/user/verify', data, { handleError: true })
    return res
  }

  /**
   * 用户注册
   * @param {object} data 注册信息
   */
  async register (data) {
    const res = await post('v1/user/register', data, { handleError: true })
    return res
  }

  /**
   * 登陆获取tokens
   * @param {string} email 用户名
   * @param {string} password 密码
   */
  async getToken ({ email, password }) {
    const tokens = await post('v1/user/login', { email, password }, { handleError: true })
    saveTokens(tokens.access_token, tokens.refresh_token)
    return tokens
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  async getInformation () {
    const res = await get('v1/user/getInformation')
    return res
  }

  /**
   * 保存修改信息，并返回User实例
   * @param {String} nickname 昵称
   * @param {String} city 城市
   * @param {String} sex 性别
   * @param {String} introduce 介绍
   */
  async changeInformation ({ nickname, city, sex, introduce }) {
    const res = await post('v1/user/changeInformation', { nickname, city, sex, introduce }, { handleError: true })
    return res
  }

  /**
   * 获取当前用户信息和所拥有的权限
   */
  async getAuths () {
    const info = await get('v1/user/auths')
    return new User(
      info.email,
      info.avatar,
      info.nickname,
    )
  }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  async updatePassword ({ old_password, new_password, confirm_password }) {
    return await put('v1/user/change_password', {
      new_password,
      confirm_password,
      old_password,
    })
  }

  // 类中的方法可以代表一个用户行为
  async addUser (info) {
    const res = await post('v1/user', info, { handleError: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象

  /**
   * 根据ID获取用户信息
   * @param {int} id 用户ID
   */
  async getUser (id) {
    const res = await get(`v1/user/${id}`, { handleError: true })
    return res
  }

  async editUser (id, info) {
    const res = await put(`v1/user/${id}`, info)
    return res
  }

  async delectUser (id) {
    const res = await _delete(`v1/user/${id}`)
    return res
  }

  async getAllUser () {
    const res = await get('v1/user', { handleError: true })
    return res
  }
}

export default new User()
