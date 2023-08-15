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
        component: () => import(/* webpackChunkName: "about" */ '../views/course.vue'),
      },
      {
        path: '/course-care',
        name: 'courseCare',
        component: () => import(/* webpackChunkName: "about" */ '../views/course1.vue'),
      },
      {
        path: '/course-medical',
        name: 'courseMedical',
        component: () => import(/* webpackChunkName: "about" */ '../views/course2.vue'),
      },
      {
        path: '/course-old',
        name: 'courseOld',
        component: () => import(/* webpackChunkName: "about" */ '../views/course3.vue'),
      },
      {
        path: '/course-duties',
        name: 'courseDuties',
        component: () => import(/* webpackChunkName: "about" */ '../views/course4.vue'),
      },
      {
        path: '/course-cook',
        name: 'courseCook',
        component: () => import(/* webpackChunkName: "about" */ '../views/course5.vue'),
      },
      {
        path: '/course-pastry',
        name: 'coursePastry',
        component: () => import(/* webpackChunkName: "about" */ '../views/course6.vue'),
      },
      {
        path: '/course-flower',
        name: 'courseFlower',
        component: () => import(/* webpackChunkName: "about" */ '../views/course7.vue'),
      },
      {
        path: '/course-tea',
        name: 'courseTea',
        component: () => import(/* webpackChunkName: "about" */ '../views/course8.vue'),
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
