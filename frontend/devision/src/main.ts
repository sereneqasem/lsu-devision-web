import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

//add axios interceptor for automatic token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      
      const refreshToken = localStorage.getItem('refresh')
      if (refreshToken) {
        try {
          const response = await axios.post('/api/auth/refresh/', {
            refresh: refreshToken
          })
          
          localStorage.setItem('access', response.data.access)
          
          //retry original request with new token
          original.headers.Authorization = `Bearer ${response.data.access}`
          return axios(original)
        } catch (refreshError) {
          //refresh failed, clear tokens and redirect to login
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          router.push('/login')
          return Promise.reject(refreshError)
        }
      } else {
        //no refresh token, redirect to login
        router.push('/login')
      }
    }
    
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(router)
app.use(createBootstrap())

app.mount('#app')
