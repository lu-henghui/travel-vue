import { post, get, put, _delete } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Scenics {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addScenics(info) {
    const res = await post('v1/scenics', info, { handleError: true })
    return res
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  
  /**
   * 根据ID获取旅行地
   * @param {int} id 旅行地ID
   */
  async getScenics(id) {
    const res = await get(`v1/scenics/${id}`)
    return res
  }

  async editScenics(id, info) {
    const res = await put(`v1/scenics/${id}`, info)
    return res
  }

  async delectScenics(id) {
    const res = await _delete(`v1/scenics/${id}`)
    return res
  }

  async getAllScenics() {
    const res = await get('v1/scenics')
    return res
  }
}

export default new Scenics()
