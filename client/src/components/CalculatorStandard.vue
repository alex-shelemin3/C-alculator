<template>
  <div class="container">
    <div class="calculator">
      <!-- Display -->
      <input
        v-model="display"
        type="text"
        class="calc-display form-control display"
        disabled
      />

      <!-- Button Grid -->
      <div class="row g-2">
        <!-- Row 1: Functions -->
        <div class="col-3">
          <button class="btn btn-warning" @click="append('%')">%</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('1/x')">1/x</button>
        </div>
        <div class="col-3">
          <button class="btn btn-danger" @click="clear()">C</button>
        </div>
        <div class="col-3">
          <button class="btn btn-danger" @click="backspace()">⌫</button>
        </div>

        <!-- Row 2: Powers & Root -->
        <div class="col-3">
          <button class="btn btn-warning" @click="append('x²')">x²</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('x³')">x³</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('√x')">√x</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('/')">/</button>
        </div>

        <!-- Row 3: 7 8 9 * -->
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('7')">7</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('8')">8</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('9')">9</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('*')">*</button>
        </div>

        <!-- Row 4: 4 5 6 - -->
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('4')">4</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('5')">5</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('6')">6</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('-')">-</button>
        </div>

        <!-- Row 5: 1 2 3 + -->
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('1')">1</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('2')">2</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('3')">3</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('+')">+</button>
        </div>

        <!-- Row 6: +/- 0 . = -->
        <div class="col-3">
          <button class="btn btn-secondary" @click="toggleNegative()">+/-</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('0')">0</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('.')">.</button>
        </div>
        <div class="col-3">
          <button class="btn btn-success" @click="calculate()">=</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { calcAPI } from '../services/api'

const emit = defineEmits(['calculate'])

const display = ref('')

const append = (value) => {
  if (value === 'x²') {
    display.value += '**2'
  } else if (value === 'x³') {
    display.value += '**3'
  } else if (value === '√x') {
    display.value = `Math.sqrt(${display.value})`
  } else if (value === '1/x') {
    if (display.value !== '') {
      display.value = `1/(${display.value})`
    }
  } else {
    display.value += value
  }
}

const clear = () => {
  display.value = ''
}

const backspace = () => {
  display.value = display.value.slice(0, -1)
}

const toggleNegative = () => {
  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1)
  } else if (display.value !== '') {
    display.value = '-' + display.value
  }
}

const calculate = async () => {
  if (!display.value) return

  try {
    const token = localStorage.getItem('token')

    if (token) {
      // Якщо авторизований - відправляємо на бекенд
      const response = await calcAPI.calculate(display.value, 10)
      display.value = response.data.result
    } else {
      // Якщо не авторизований - обчислюємо локально
      const result = evaluateLocal(display.value)
      display.value = result
    }

    emit('calculate')
  } catch (error) {
    display.value = 'Error'
    console.error('Calculation error:', error)
    setTimeout(() => {
      display.value = ''
    }, 2000)
  }
}

// Локальна функція обчислення (для гостей)
const evaluateLocal = (expr) => {
  let prepared = expr
    .replace(/Math\.sqrt\(/g, 'Math.sqrt(')
    .replace(/√/g, 'Math.sqrt(')
    .replace(/\^/g, '**')

  prepared = prepared.replace(/(\d+(?:\.\d+)?)%/g, (_, num) => {
    return '(' + num + '/100)'
  })

  const result = eval(prepared)
  if (result === undefined || result === null) throw new Error('Invalid')
  if (!isFinite(result)) throw new Error('Division by zero')
  return parseFloat(result.toPrecision(10)).toString()
}
</script>

<style scoped>
.calculator {
  max-width: 320px;
  margin: 50px auto;
  padding: 20px;
  background: #1e1e1e;
  border-radius: 10px;
}

.btn {
  width: 100%;
  height: 60px;
  font-size: 1.2rem;
}

.display {
  height: 60px;
  font-size: 1.5rem;
  text-align: right;
  margin-bottom: 10px;
  background-color: #0a0a0a !important;
  color: #00ff00 !important;
  border: 1px solid #333 !important;
}
</style>
