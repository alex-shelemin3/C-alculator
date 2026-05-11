<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh">
    <div class="card-custom p-4 text-center" style="width: 100%; max-width: 350px">
      <div class="mb-3">
        <img src="@/assets/icon2.svg" width="100" alt="icon" />
      </div>
      <h4 class="mb-3">Створити акаунт</h4>

      <!-- Name -->
      <input
        v-model="form.name"
        type="text"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Ваше ім'я"
      />

      <!-- Email -->
      <input
        v-model="form.email"
        type="email"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Email адреса"
      />

      <!-- Gender & Birth -->
      <div class="row mb-3">
        <div class="col-md-6 text-start">
          <label class="form-label text-secondary">Стать</label>
          <select v-model="form.gender" class="form-select bg-dark text-white border-secondary">
            <option value="" selected disabled>Оберіть стать</option>
            <option value="Чоловіча">Чоловіча</option>
            <option value="Жіноча">Жіноча</option>
          </select>
        </div>
        <div class="col-md-6 text-start">
          <label class="form-label text-secondary">Дата народження</label>
          <input
            v-model="form.birth"
            type="date"
            class="form-control bg-dark text-white border-secondary"
          />
        </div>
      </div>

      <!-- Password -->
      <input
        v-model="form.password"
        type="password"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Пароль"
      />

      <!-- Confirm Password -->
      <input
        v-model="form.confirm"
        type="password"
        class="form-control mb-3 bg-dark text-white border-secondary"
        placeholder="Повторіть пароль"
      />

      <!-- Agree -->
      <div class="form-check text-start mb-3">
        <input v-model="form.agree" class="form-check-input" type="checkbox" id="reg-agree" />
        <label class="form-check-label text-secondary" for="reg-agree">
          Я погоджуюсь з умовами
        </label>
      </div>

      <!-- Register Button -->
      <button class="btn btn-primary w-100 mb-3" @click="register" :disabled="isLoading">
        {{ isLoading ? 'Завантаження...' : 'Зареєструватись' }}
      </button>

      <hr class="border-secondary" />

      <!-- Login Link -->
      <p class="text-secondary mb-0" style="font-size: 0.9rem">
        Вже маєте акаунт?
        <RouterLink to="/login" class="text-info">Увійти</RouterLink>
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
  name: '',
  email: '',
  gender: '',
  birth: '',
  password: '',
  confirm: '',
  agree: false,
})

const isLoading = ref(false)

const register = async () => {
  // Базова валідація
  if (!form.value.name || !form.value.email || !form.value.password || !form.value.agree) {
    showNotification("Заповніть всі обов'язкові поля", 'warning')
    return
  }

  isLoading.value = true

  try {
    const response = await authAPI.register({
      name: form.value.name,
      email: form.value.email,
      gender: form.value.gender,
      birth: form.value.birth,
      password: form.value.password,
      confirm: form.value.confirm,
    })

    const { token, user } = response.data

    // Зберігаємо токен та користувача
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    showNotification('Реєстрація успішна!', 'success')

    // Редирект на профіль
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Помилка при реєстрації'
    showNotification(errorMessage, 'danger')
    console.error('Register error:', error)
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
