import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountPage.vue'),
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('../views/BasePage.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue'),
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: () => import('../views/CreateAccountPage.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpPage.vue'),
    },
    {
      path: '/home',
      name: 'homePage',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/predictions',
      name: 'predictions',
      component: () => import('../views/PredictionPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsPage.vue'),
    }
  ],
})

//navigation guard to require login for all routes except /login
router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = !!localStorage.getItem('access')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  //if logged in and trying to access /login, redirect to home
  if (to.path === '/login' && loggedIn) {
    return next('/')
  }
  next()
})

export default router
