import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9fb398e2 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _41e46022 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _2baedc30 = () => interopDefault(import('../pages/projects.vue' /* webpackChunkName: "pages/projects" */))
const _6043e358 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _9fb398e2,
    name: "about"
  }, {
    path: "/contact",
    component: _41e46022,
    name: "contact"
  }, {
    path: "/projects",
    component: _2baedc30,
    name: "projects"
  }, {
    path: "/",
    component: _6043e358,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
