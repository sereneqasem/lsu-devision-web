//tabbed interface for login and account creation idea here 
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const activeTab = ref('login')

//login form
const loginUsername = ref('')
const loginPassword = ref('')
const loginError = ref('')
const router = useRouter()

async function login() {
  loginError.value = ''
  try {
    const response = await axios.post('/api/auth/login/', {
      username: loginUsername.value,
      password: loginPassword.value
    })
    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)
    router.push('/') //redirect to home page after login
  } catch (err: any) {
    loginError.value = err.response?.data?.detail || 'Login failed.'
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
    regError.value = err.response?.data?.detail || 'Registration failed. Check if an account with this username or email already exists.'
  }
}
</script>

<template>
  <div class="auth-tabs">
    <div class="tab-header">
      <button :class="{active: activeTab === 'login'}" @click="activeTab = 'login'">Login</button>
      <button :class="{active: activeTab === 'register'}" @click="activeTab = 'register'">Create Account</button>
    </div>
    <div v-if="activeTab === 'login'" class="tab-content">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label>Username:</label>
          <input v-model="loginUsername" type="text" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="loginPassword" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div v-if="loginError" class="error">{{ loginError }}</div>
    </div>
    <div v-if="activeTab === 'register'" class="tab-content">
      <h2>Create Account</h2>
      <form @submit.prevent="register">
        <div>
          <label>Username:</label>
          <input v-model="regUsername" type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="regEmail" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="regPassword" type="password" required />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <div v-if="regError" class="error">{{ regError }}</div>
      <div v-if="regSuccess" class="success">{{ regSuccess }}</div>
    </div>
  </div>
</template>

<style scoped>
.auth-tabs {
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.tab-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.tab-header button {
  flex: 1;
  padding: 0.5em;
  border: none;
  background: #eee;
  cursor: pointer;
  font-weight: bold;
}
.tab-header button.active {
  background: #81b4ba;
  color: #fff;
}
.tab-content {
  margin-top: 1em;
}
.error {
  color: red;
  margin-top: 1em;
}
.success {
  color: green;
  margin-top: 1em;
}
</style>