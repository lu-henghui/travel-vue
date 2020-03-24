const Config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  stagnateTime: 2 * 60 * 60 * 1000, // 无操作停滞时间  默认2小时
  openAutoJumpOut: true, // 是否开启无操作跳出
  notLoginRoute: ['Login', 'Register', 'Main', 'Scenics', 'ScenicsDetail', 'Note', 'NoteDetail', 'Guide'], // 无需登录即可访问的路由 name,
  defaultRoute: '/main', // 默认打开的路由
}

export default Config