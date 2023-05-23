import { createRouter, createWebHistory } from 'vue-router'
import GreedyView from '@/views/GreedyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'greedy',
      component: GreedyView
    }
  ]
})

export default router
