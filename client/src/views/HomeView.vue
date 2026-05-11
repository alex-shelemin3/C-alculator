<template>
  <div class="container py-5">
    <!-- Вкладки: Звичайний / Програмістський -->
    <div class="text-center mt-4 mb-4">
      <h2 style="cursor: pointer; display: inline-block">
        <span
          @click="currentMode = 'standard'"
          :style="{ color: currentMode === 'standard' ? '#0091d5' : '#555', transition: '0.3s' }"
        >
          Звичайний
        </span>
        <span style="color: #555; margin: 0 10px">|</span>
        <span
          @click="currentMode = 'programmer'"
          :style="{ color: currentMode === 'programmer' ? '#0091d5' : '#555', transition: '0.3s' }"
        >
          Програмістський
        </span>
      </h2>
    </div>

    <!-- Звичайний калькулятор -->
    <CalculatorStandard v-if="currentMode === 'standard'" @calculate="onCalculate" />

    <!-- Програмістський калькулятор -->
    <CalculatorProgrammer v-else @calculate="onCalculate" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CalculatorStandard from '../components/CalculatorStandard.vue'
import CalculatorProgrammer from '../components/CalculatorProgrammer.vue'

const currentMode = ref('standard')

onMounted(() => {
  // Перевіряємо, чи користувач авторизований
  const token = localStorage.getItem('token')
  if (!token) {
    console.log('User not logged in - calculator stats won\'t be saved')
  }
})

// Обробник обчислення
const onCalculate = () => {
  // Логіка для оновлення статистики (якщо необхідно)
  console.log('Calculation completed')
}
</script>

<style scoped>
h2 span:hover {
  cursor: pointer;
}
</style>
