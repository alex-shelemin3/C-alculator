<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Навігація -->
    <Navbar />

    <!-- Основний контент -->
    <main class="flex-grow-1">
      <RouterView />
    </main>

    <!-- Сповіщення (Toast) -->
    <Toast v-if="showToast" :message="toastMessage" :type="toastType" />

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container text-center">
        <p>© 2026 C++alculator | Web Design Lab</p>
        <small class="text-secondary">Розроблено для лабораторної роботи №1</small>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Toast from './components/Toast.vue'

// Глобальні сповіщення (використовуватимемо через provide)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('info')

// Функція для показу сповіщення
window.showNotification = (message, type = 'info') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
body {
  background-color: #121212;
  color: white;
}
</style>
