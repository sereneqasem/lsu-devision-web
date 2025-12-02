<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const error = ref('')
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('access')
  if (!token) {
    router.push('/login')
    return
  }
  try {
    const response = await axios.get('/api/auth/user/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    name.value = response.data.username
    email.value = response.data.email
  } catch (err: any) {
    console.error('Account page error:', err.response?.status, err.response?.data)
    error.value = `Failed to load user info. Status: ${err.response?.status || 'Unknown'}`
    //the global axios interceptor will handle token refresh and redirect if needed
  }
})

function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push('/login')
}
</script>

<template>
  <div class="account-bg">
    <div class="account-card">
      <h2>Account Information</h2>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else class="info-content">
        <div class="info-row">
          <span class="info-label">Username:</span>
          <span class="info-value">{{ name }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">{{ email }}</span>
        </div>
        <button @click="logout" class="logout-btn">Log Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #81b4ba 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-card {
  background: #fff;
  padding: 2.5em 2em 2em 2em;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  margin-bottom: 2em;
  color: #2c3e50;
  font-weight: 700;
}
.info-content {
  width: 100%;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2em;
  padding: 0.7em 0.5em;
  border-bottom: 1px solid #e0e0e0;
}
.info-label {
  color: #555;
  font-weight: 600;
  font-size: 1.05em;
}
.info-value {
  color: #222;
  font-size: 1.05em;
}
.error {
  color: #d32f2f;
  margin-top: 1em;
  font-size: 1em;
  text-align: center;
}
.logout-btn {
  width: 100%;
  padding: 0.8em;
  background: #d73027;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5em;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #b71c1c;
}
</style>