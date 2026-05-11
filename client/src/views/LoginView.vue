<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh">
    <div class="card-custom p-4 text-center" style="width: 100%; max-width: 350px">
      <div class="mb-3">
        <img src="@/assets/icon2.svg" width="100" alt="icon" />
      </div>
      <h4 class="mb-3">Вхід у систему</h4>

      <!-- Email -->
      <input
        v-model="form.email"
        type="email"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Email адреса"
        @keyup.enter="login"
      />

      <!-- Password -->
      <input
        v-model="form.password"
        type="password"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Пароль"
        @keyup.enter="login"
      />

      <!-- Remember -->
      <div class="form-check text-start mb-3">
        <input v-model="form.remember" class="form-check-input" type="checkbox" id="remember" />
        <label class="form-check-label text-secondary" for="remember"> Запам'ятати мене </label>
      </div>

      <!-- Login Button -->
      <button class="btn btn-primary w-100 mb-3" @click="login" :disabled="isLoading">
        {{ isLoading ? 'Завантаження...' : 'Увійти' }}
      </button>

      <hr class="border-secondary" />

      <!-- Register Link -->
      <p class="text-secondary mb-0" style="font-size: 0.9rem">
        Ще не маєте акаунту?
        <RouterLink to="/register" class="text-info">Зареєструватися</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '../services/api'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isLoading = ref(false)

const login = async () => {
  if (!form.value.email || !form.value.password) {
    showNotification('Заповніть всі поля', 'warning')
    return
  }

  isLoading.value = true

  try {
    const response = await authAPI.login(form.value.email, form.value.password)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    showNotification('Вхід успішний!', 'success')
    setTimeout(() => {
      router.push('/profile')
    }, 1000)
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Помилка при вході'
    showNotification(errorMessage, 'danger')
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.card-custom {
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

::placeholder {
  color: #aaa !important;
  opacity: 1;
}

.btn:disabled {
  opacity: 0.6;
}
</style>
