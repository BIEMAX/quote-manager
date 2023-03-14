import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'
// import { userHasAccess } from 'src/util/UserCanAccess'
import useStore from 'src/store/index'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default route(function ({ store /*, ssrContext */ }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  // Router guard
  Router.beforeEach((to, from, next) => {
    if (to.name === undefined) next() // First access
    else {
      const destination = to.name?.toString() || ''
      const permissions = store.getters['user/getPermissions']
      console.log('permissions: ', permissions)
      if (permissions !== undefined && permissions.length > 0 && destination !== '') {
        const hasPermission = permissions
          .filter(p => p.name.toUpperCase().trim() === destination.toUpperCase().trim())
          .map((p) => p.hasAccess)
        if (hasPermission) next()
        else return false
      } else return false
    }
  })

  return Router
})
