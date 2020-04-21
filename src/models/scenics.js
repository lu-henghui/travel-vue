import { get } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Scenics {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  // async addScenics(info) {
  //   const res = await post('v1/scenics', info, { handleError: true })
  //   return res
  // }

  /**
   * 根据ID获取景点
   * @param {int} id 景点ID
   */
  async getScenics(id) {
    const res = await get(`v1/scenics/${id}`, { handleError: true })
    return res
  }

  /**
   * 搜索景点
   * @param {String} search 关键词
   */
  async getScenicsByKeyword(search) {
    const res = await get('v1/scenics/search?q='+ search, { handleError: true })
    return res
  }

  /**
   * 获取所有景点
   */
  async getAllScenics() {
    const res = await get('v1/scenics', { handleError: true })
    return res
  }

  /**
   * 获取最火景点 
   */
  async getHotScenics() {
    const res = await get('v1/scenics/hotScenics', { handleError: true })
    return res
  }

  /**
   * 根据地点获取景点
   * @param {String} position 地点
   */
  async getScenicsByPosition(position) {
    const res = await get('v1/scenics/position?q='+ position, { handleError: true })
    return res
  }
}

export default new Scenics()
