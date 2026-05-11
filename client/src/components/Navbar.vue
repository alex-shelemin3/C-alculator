<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img src="@/assets/logo.svg" height="30" alt="C++alculator Logo" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" :class="{ active: isActive('/') }">
              Головна
            </RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" :class="{ active: isActive('/about') }">
              Про сайт
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink to="/profile" class="nav-link" :class="{ active: isActive('/profile') }">
              👤 {{ isLoggedIn ? userName : 'Профіль' }}
            </RouterLink>
          </li>

          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <RouterLink
                to="/register"
                class="nav-link"
                :class="{ active: isActive('/register') }"
              >
                Реєстрація
              </RouterLink>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <a href="#" class="nav-link text-danger" @click.prevent="logout"> Вихід </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const userName = ref('')

const updateAuthStatus = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token && user) {
    isLoggedIn.value = true
    const userData = JSON.parse(user)
    userName.value = userData.name || 'Користувач'
  } else {
    isLoggedIn.value = false
    userName.value = ''
  }
}
watch(
  () => route.path,
  () => {
    updateAuthStatus()
  },
)

onMounted(() => {
  updateAuthStatus()
})

const isActive = (path) => route.path === path

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  updateAuthStatus()
  router.push('/')
}
</script>

<style scoped>
.navbar-brand {
  transition: opacity 0.3s;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.nav-link {
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0091d5 !important;
}
</style>
