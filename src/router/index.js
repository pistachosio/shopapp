import {
  createRouter,
  createWebHistory
} from 'vue-router'

import {
  isMobile
} from '../helpers/agent';

import store from '../store';

const routes = !isMobile() ? require('./__desktop').default : require('./__mobile').default;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    localStorage.setItem('fullPath', to.fullPath);
    return store.getters['auth/isAuthenticated'] ? next() : next('/')
  } else {
    next()
  }
})

export default router