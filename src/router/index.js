import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Manage from '@/views/ManageView.vue'
import Song from '@/views/SongView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  document.title = 'Music App | ' + to.name

  if (to.meta.requiresAuth && !userStore.userLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
