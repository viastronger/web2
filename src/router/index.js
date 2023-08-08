import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '../layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
      },
      {
        path: '/birth',
        name: 'birth',
        component: () => import(/* webpackChunkName: "about" */ '../views/birth.vue'),
      },
      {
        path: '/care',
        name: 'care',
        component: () => import(/* webpackChunkName: "about" */ '../views/care.vue'),
      },
      {
        path: '/chaperonage',
        name: 'chaperonage',
        component: () => import(/* webpackChunkName: "about" */ '../views/chaperonage.vue'),
      },
      {
        path: '/pregnancy',
        name: 'pregnancy',
        component: () => import(/* webpackChunkName: "about" */ '../views/pregnancy.vue'),
      },
      {
        path: '/child',
        name: 'child',
        component: () => import(/* webpackChunkName: "about" */ '../views/child.vue'),
      },
      {
        path: '/bring-up',
        name: 'bring-up',
        component: () => import(/* webpackChunkName: "about" */ '../views/bring-up.vue'),
      },
      {
        path: '/experience',
        name: 'experience',
        component: () => import(/* webpackChunkName: "about" */ '../views/experience.vue'),
      },
      {
        path: '/apply',
        name: 'apply',
        component: () => import(/* webpackChunkName: "about" */ '../views/apply.vue'),
      },
      {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "about" */ '../views/search.vue'),
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/detail/index.vue'),
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => {
    return { 
      left: 0,
      top: 0,
      // behavior: 'smooth'
    }
  }
})

export default router
