import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import appConfig from '@/config/index'
// import Util from '@/lin/utils/util'

Vue.use(Router)

const month = new Date().getMonth() + 1

const homeRouter = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/index/index'),
  },
  {
    path: '/scenics',
    redirect: '/scenics/m/' + month
  },
  {
    path: '/scenics/m/:id',
    name: 'Scenics',
    component: () => import('@/views/scenics/Scenics'),
  },
  {
    path: '/scenics/:id',
    name: 'ScenicsDetail',
    component: () => import('@/views/scenics/ScenicsDetail'),
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('@/views/note/Note'),
  },
  {
    path: '/note/:id',
    name: 'NoteDetail',
    component: () => import('@/views/note/NoteDetail'),
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/views/guide/Guide'),
  },
  {
    path: '/guide/:id',
    name: 'GuideDetail',
    component: () => import('@/views/guide/GuideDetail'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/user/User'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/setting/Setting'),
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('@/views/editor/Editor'),
  },
  {
    path: 'search',
    name: 'Search',
    component: () => import('@/views/search/Search')
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/main',
    component: () => import('@/views/home/Home'),
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register'),
  },

  //404专用
  {
    redirect: '/404',
    path: '*',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
  }
]

const router = new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  base: process.env.BASE_URL,
  routes
})

// 判断是否需要登录访问, 配置位于 config 文件夹
let isLoginRequired = routeName => {
  // 首次执行时缓存配置
  let { notLoginRoute } = appConfig
  const notLoginMark = {}

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true
    }
  }

  notLoginRoute = null // 释放内存

  // 重写初始化函数
  isLoginRequired = name => {
    if (!name) {
      return true
    }
    // 处理 Symbol 类型
    const target = typeof name === 'symbol' ? name.description : name
    return !notLoginMark[target]
  }

  return isLoginRequired(routeName)
}

router.beforeEach((to, from, next) => {
  // 登录验证
  if (isLoginRequired(to.name) && !store.state.logined) {
    next({ path: '/login' })
    return
  }

  // 权限验证
  // if (store && store.state && store.getters) {
  //   const { auths, user } = store.getters
  //   if (to.path !== '/main' && !Util.hasPermission(auths, to.meta, user)) {
  //     Vue.prototype.$notify({
  //       title: '无权限',
  //       dangerouslyUseHTMLString: true,
  //       message: '<strong class="my-notify">您无此页面的权限哟</strong>',
  //     })
  //     next({ path: '/main' })
  //     return
  //   }
  // }

  // 路由发生变化重新计时
  Vue.prototype.$_lin_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router
