import { createRouter, createWebHistory } from 'vue-router'
import store from '@/stores/store'
import { ElMessage } from 'element-plus'

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
        }, {
          path: 'register',
          name: 'welcome-register',
          component: () => import('@/components/welcome/RegisterPage.vue')
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

router.beforeEach((to, from, next) => {
  const isAuthorized = (store.state.currentUser !== '');

  if (to.name.startsWith('welcome-') && isAuthorized) {
    ElMessage.success('您已成功登录！');
    next('/home');
  } else if (!to.name.startsWith('welcome-') && !isAuthorized) {
    ElMessage.warning('请先完成登录操作！');
    next('/');
  } else {
    next();
  }
})

export default router
