<script setup lang="ts">    
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const activeTab = ref('login')
const isLoggedIn = ref(false)

//check login status on mount
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('access')
})

//login form
const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const response = await axios.post('/api/auth/login/', {
      username: username.value,
      password: password.value
    })
    //save JWT token (access/refresh) to localStorage or memory
    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)
    isLoggedIn.value = true
    //redirect to home or dashboard
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.detail || 'Login failed.'
  }
}

//registration form
const regUsername = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regError = ref('')
const regSuccess = ref('')

async function register() {
  regError.value = ''
  regSuccess.value = ''
  try {
    await axios.post('/api/auth/register/', {
      username: regUsername.value,
      email: regEmail.value,
      password: regPassword.value
    })
    regSuccess.value = 'Account created! You can now log in.'
    setTimeout(() => {
      activeTab.value = 'login'
    }, 1500)
    
  } catch (err: any) {
    regError.value = err.response?.data?.detail || 'Registration failed.'
  }
}
</script>

<template>
  <div class="login-bg">
    <div class="login-card">
      <div v-if="!isLoggedIn">
        <div class="tab-header">
          <button :class="{active: activeTab === 'login'}" @click="activeTab = 'login'">Login</button>
          <button :class="{active: activeTab === 'register'}" @click="activeTab = 'register'">Create Account</button>
        </div>
        <div v-if="activeTab === 'login'" class="tab-content">
          <h2>Welcome Back</h2>
          <form @submit.prevent="login">
            <div class="input-group">
              <label for="username">Username</label>
              <input v-model="username" id="username" type="text" placeholder="Enter your username" required />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input v-model="password" id="password" type="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" class="login-btn">Login</button>
          </form>
          <div v-if="error" class="error">{{ error }}</div>
          
          <!-- forgot passwork link (not functional yet, just is there incase future teams use myLSU and third party logins) -->
          <div class="forgot-password-section">
            <a href="#" class="forgot-password-link" @click.prevent="">Forgot Password?</a>
          </div>
        </div>
        <div v-if="activeTab === 'register'" class="tab-content">
          <h2>Create Account</h2>
          <form @submit.prevent="register">
            <div class="input-group">
              <label for="reg-username">Username</label>
              <input v-model="regUsername" id="reg-username" type="text" placeholder="Choose a username" required />
            </div>
            <div class="input-group">
              <label for="reg-email">Email</label>
              <input v-model="regEmail" id="reg-email" type="email" placeholder="Enter your email address" required />
            </div>
            <div class="input-group">
              <label for="reg-password">Password</label>
              <input v-model="regPassword" id="reg-password" type="password" placeholder="Create a password" required />
            </div>
            <button type="submit" class="login-btn">Create Account</button>
          </form>
          <div v-if="regError" class="error">{{ regError }}</div>
          <div v-if="regSuccess" class="success">{{ regSuccess }}</div>
        </div>
      </div>
      <div v-else class="tab-content">
        <h2>You are logged in!</h2>
        <p>Welcome to the site.</p>
        <button @click="router.push('/account')" class="login-btn">Go to Account</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #81b4ba 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: #fff;
  padding: 2.5em 2em 2em 2em;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  width: 100%;
}
.tab-header button {
  flex: 1;
  padding: 0.7em;
  border: none;
  background: #eee;
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px 6px 0 0;
  font-size: 1em;
  transition: background 0.2s;
  color: #222; 
}
.tab-header button.active {
  background: #81b4ba;
  color: #fff;
}
.tab-content {
  width: 100%;
}
.input-group {
  width: 100%;
  margin-bottom: 1.2em;
  display: flex;
  flex-direction: column;
}
.input-group label {
  margin-bottom: 0.3em;
  color: #555;
  font-size: 1em;
}
.input-group input {
  padding: 0.7em;
  border: 1px solid #bcd0d3;
  border-radius: 6px;
  font-size: 1em;
  outline: none;
  transition: border 0.2s;
}
.input-group input:focus {
  border: 1.5px solid #81b4ba;
}
.login-btn {
  width: 100%;
  padding: 0.8em;
  background: #81b4ba;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5em;
  transition: background 0.2s;
}
.login-btn:hover {
  background: #5a8d94;
}
.error {
  color: #d32f2f;
  margin-top: 1em;
  font-size: 1em;
  text-align: center;
}
.success {
  color: green;
  margin-top: 1em;
  font-size: 1em;
  text-align: center;
}
.forgot-password-section {
  text-align: center;
  margin-top: 1em;
}
.forgot-password-link {
  color: #81b4ba;
  text-decoration: none;
  font-size: 0.9em;
  cursor: pointer;
}
.forgot-password-link:hover {
  color: #5a8d94;
  text-decoration: underline;
}
</style>