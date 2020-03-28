import { get } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Banner {
  /**
   * 获取我的Banner
   */
  async getBanners () {
    let res = await get('v1/banner/', { handleError: true })
    return res
  }
}


export default new Banner()
