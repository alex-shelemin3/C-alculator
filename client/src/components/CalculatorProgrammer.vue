<template>
  <div class="container">
    <div class="calculator">
      <!-- Display -->
      <input
        v-model="display"
        type="text"
        class="calc-display form-control display mb-2"
        disabled
      />

      <!-- Base Selection -->
      <div class="row g-2 mb-3">
        <div class="col-3">
          <button
            class="btn"
            :class="base === 2 ? 'btn-primary' : 'btn-warning'"
            @click="setBase(2)"
          >
            BIN
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn"
            :class="base === 8 ? 'btn-primary' : 'btn-warning'"
            @click="setBase(8)"
          >
            OCT
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn"
            :class="base === 10 ? 'btn-primary' : 'btn-warning'"
            @click="setBase(10)"
          >
            DEC
          </button>
        </div>
        <div class="col-3">
          <button
            class="btn"
            :class="base === 16 ? 'btn-primary' : 'btn-warning'"
            @click="setBase(16)"
          >
            HEX
          </button>
        </div>
      </div>

      <!-- Hex Digits -->
      <div class="row g-2">
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('A')">A</button>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('B')">B</button>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('C')">C</button>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('D')">D</button>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('E')">E</button>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="append('F')">F</button>
        </div>

        <!-- Bit Operations -->
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('<<')"><<</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('>>')">>></button>
        </div>
        <div class="col-3">
          <button class="btn btn-danger" @click="clear()">C</button>
        </div>
        <div class="col-3">
          <button class="btn btn-danger" @click="backspace()">⌫</button>
        </div>

        <!-- Parentheses & Modulo -->
        <div class="col-3">
          <button class="btn btn-secondary" @click="append('(')">(</button>
        </div>
        <div class="col-3">
          <button class="btn btn-secondary" @click="append(')')">)</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('%')">%</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="append('/')">/</button>
        </div>

        <!-- Bitwise Operations -->
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('~')">NOT</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('&')">AND</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('|')">OR</button>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="bitOp('^')">XOR</button>
        </div>

        <!-- Numbers: 7 8 9 * -->
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

        <!-- Numbers: 4 5 6 - -->
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

        <!-- Numbers: 1 2 3 + -->
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

        <!-- Numbers: +/- 0 . = -->
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
const base = ref(10)

const append = (value) => {
  display.value += value
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

const setBase = (newBase) => {
  if (display.value !== '' && !isNaN(parseInt(display.value, base.value))) {
    const decimalValue = parseInt(display.value, base.value)
    display.value = decimalValue.toString(newBase).toUpperCase()
  }
  base.value = newBase
}

const bitOp = (op) => {
  if (op === '~') {
    const num = parseInt(display.value, base.value)
    if (!isNaN(num)) {
      display.value = (~num).toString(base.value).toUpperCase()
    }
  } else {
    // Інші операції
    display.value += ' ' + op + ' '
  }
}

const calculate = async () => {
  if (!display.value) return

  try {
    const token = localStorage.getItem('token')

    if (token) {
      const response = await calcAPI.calculate(display.value, base.value)
      display.value = response.data.result
    } else {
      const result = evaluateLocal(display.value, base.value)
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

const evaluateLocal = (expr, base) => {
  const match = expr.match(/^([0-9A-Fa-f]+)\s*(<<|>>|[+\-*/|&^%])\s*([0-9A-Fa-f]+)$/)

  if (!match) {
    const single = parseInt(expr, base)
    if (isNaN(single)) throw new Error('Invalid number')
    return single.toString(base).toUpperCase()
  }

  const a = parseInt(match[1], base)
  const op = match[2]
  const b = parseInt(match[3], base)

  let result
  switch (op) {
    case '+':
      result = a + b
      break
    case '-':
      result = a - b
      break
    case '*':
      result = a * b
      break
    case '/':
      if (b === 0) throw new Error('Division by zero')
      result = Math.floor(a / b)
      break
    case '%':
      result = a % b
      break
    case '|':
      result = a | b
      break
    case '&':
      result = a & b
      break
    case '^':
      result = a ^ b
      break
    case '<<':
      result = a << b
      break
    case '>>':
      result = a >> b
      break
    default:
      throw new Error('Unknown operator')
  }

  return result.toString(base).toUpperCase()
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
  font-size: 1rem;
}

.display {
  height: 60px;
  font-size: 1.5rem;
  text-align: right;
  background-color: #0a0a0a !important;
  color: #00ff00 !important;
  border: 1px solid #333 !important;
}
</style>
