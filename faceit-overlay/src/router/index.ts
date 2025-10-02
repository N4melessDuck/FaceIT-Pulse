import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsViewNew.vue')
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: () => import('@/views/OverlayView.vue')
    },
    {
      path: '/live-match',
      name: 'live-match',
      component: () => import('@/views/LiveMatchView.vue')
    }
  ]
})

export default router
