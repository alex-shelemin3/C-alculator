<template>
  <main class="container py-5">
    <div class="card p-4 bg-transparent">
      <div class="row g-4">
        <!-- Ліва колонка: аватар + статистика -->
        <div class="col-md-4 border-end border-secondary">
          <div class="text-center">
            <img
              :src="user.avatarUrl || '/src/assets/profile.svg'"
              class="avatar-img img-fluid p-1"
              alt="avatar"
            />
            <h5 class="text-white">{{ user.name }}</h5>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/*"
              @change="handleFileUpload"
            />
            <button class="btn btn-primary mb-2 w-100" @click="triggerFileInput">
              Змінити фото
            </button>
            <button
              class="btn btn-outline-danger btn-sm w-100"
              style="opacity: 0.8"
              @click="deleteAccount"
            >
              Видалити акаунт
            </button>
          </div>

          <div class="mt-4">
            <h6
              class="text-white-50 mb-3"
              style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px"
            >
              Статистика
            </h6>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="text-white" style="opacity: 0.6; font-size: 0.9rem">
                Кліків на калькуляторі
              </span>
              <span class="badge bg-primary">{{ user.clickCount || 0 }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <span class="text-white" style="opacity: 0.6; font-size: 0.9rem">
                Найбільше число
              </span>
              <span class="badge bg-success">{{ user.maxNumber || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Права колонка: особиста інформація -->
        <div class="col-md-8">
          <h5 class="mb-4 text-white" style="opacity: 0.6">Особиста інформація</h5>

          <div class="row mb-3">
            <div class="col-5 text-white" style="opacity: 0.6">Ім'я та Прізвище</div>
            <div class="col-7 text-white">{{ user.name || '—' }}</div>
          </div>

          <div class="row mb-3">
            <div class="col-5 text-white" style="opacity: 0.6">Email адреса</div>
            <div class="col-7 text-white">{{ user.email || '—' }}</div>
          </div>

          <div class="row mb-3">
            <div class="col-5 text-white" style="opacity: 0.6">Стать</div>
            <div class="col-7 text-white">{{ user.gender || '—' }}</div>
          </div>

          <div class="row mb-3">
            <div class="col-5 text-white" style="opacity: 0.6">Дата народження</div>
            <div class="col-7 text-white">{{ user.birth || '—' }}</div>
          </div>
          <div class="row mb-4">
            <div class="col-5 text-white" style="opacity: 0.6">Дата реєстрації</div>
            <div class="col-7 text-white">{{ user.regDate || '—' }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { profileAPI } from '../services/api'
const fileInput = ref(null)
const router = useRouter()

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('Файл занадто великий! Максимум 2МБ.')
    return
  }
  const formData = new FormData()
  formData.append('avatar', file)
  try {
    isLoading.value = true
    const response = await profileAPI.uploadAvatar(formData)
    const newAvatarUrl = response.data.avatarUrl
    user.value.avatarUrl = newAvatarUrl
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    storedUser.avatarUrl = newAvatarUrl
    localStorage.setItem('user', JSON.stringify(storedUser))
    alert('Фото успішно оновлено!')
  } catch (error) {
    console.error('Error uploading avatar:', error)
    alert('Не вдалося завантажити фото')
  } finally {
    isLoading.value = false
  }
}

const user = ref({
  name: '',
  email: '',
  gender: '',
  birth: '',
  regDate: '',
  clickCount: 0,
  maxNumber: 0,
})

const isLoading = ref(false)
onMounted(async () => {
  await loadProfile()
})

const loadProfile = async () => {
  try {
    const response = await profileAPI.getProfile()
    user.value = response.data
  } catch (error) {
    console.error('Error loading profile:', error)
    showNotification('Помилка при завантаженні профілю', 'danger')
    router.push('/login')
  }
}

const deleteAccount = async () => {
  if (!confirm('Ви впевнені, що хочете видалити акаунт? Це дія незворотна!')) {
    return
  }

  isLoading.value = true

  try {
    await profileAPI.deleteAccount()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    showNotification('Акаунт видалено', 'success')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    console.error('Error deleting account:', error)
    showNotification('Помилка при видаленні акаунту', 'danger')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}
.avatar-img {
  aspect-ratio: 1 / 1;
  width: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 2px solid #6c757d;
  max-width: 100%;
  height: auto;
}
</style>
