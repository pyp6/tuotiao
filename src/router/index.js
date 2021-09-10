import { createRouter, createWebHistory } from 'vue-router'

// 路由表
const routes = [
  // 路由懒加载
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/')    
  },
  {
    path: '/',
    component: () => import('../views/layout/'),
    // 配置子路由
    children:[
      {
        path: '', //默认子路由
        name: 'home',
        component: () => import('../views/home/')    
      },
      {
        path: '/qa', 
        name: 'qa',
        component: () => import('../views/qa/')    
      },
      {
        path: '/my', 
        name: 'my',
        component: () => import('../views/my/')    
      }, {
        path: '/video', 
        name: 'video',
        component: () => import('../views/video/')    
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
