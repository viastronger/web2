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
        path: '/train',
        name: 'train',
        component: () => import(/* webpackChunkName: "about" */ '../views/train.vue'),
      },
      {
        path: '/query',
        name: 'query',
        component: () => import(/* webpackChunkName: "about" */ '../views/query.vue'),
      },
      {
        path: '/student',
        name: 'student',
        component: () => import(/* webpackChunkName: "about" */ '../views/student.vue'),
      },
      {
        path: '/course/:id',
        name: 'course',
        component: () => import(/* webpackChunkName: "about" */ '../views/test.vue'),
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
