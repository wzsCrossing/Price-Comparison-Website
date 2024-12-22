import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import('@/components/welcome/LoginPage.vue')
        }
      ]
    }, {
      path: '/home',
      name: 'home',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'home-main',
          component: () => import('@/components/main/HomePage.vue')
        }
      ]
    }, {
      path: '/commodity',
      name: 'commodity',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'commodity-main',
          component: () => import('@/components/main/CommodityPage.vue')
        }
      ]
    }, {
      path: '/user-info',
      name: 'user-info',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'user-info-main',
          component: () => import('@/components/main/user/UserInfoPage.vue')
        }
      ]
    }, {
      path: '/user-follow',
      name: 'user-follow',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'user-follow-main',
          component: () => import('@/components/main/user/UserFollowPage.vue')
        }
      ]
    }
  ],
})

export default router
