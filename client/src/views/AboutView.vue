<template>
  <main class="container py-5">
    <div class="text-center mb-3">
      <h1>Що таке C++alculator?</h1>
      <p class="text-secondary">Калькулятор для програмістів від програміста</p>
    </div>

    <div class="row align-items-center mb-5">
      <div class="col-md-3 text-center">
        <img src="@/assets/icon.svg" class="img-fluid" style="max-height: 100%" />
      </div>
      <div class="col-md-8 mt-2 text-center">
        <p>
          «С++alulator» - це веб-додаток у вигляді калькулятора, який підтримує два режими роботи:
          звичайний та програмістський. Додаток призначений для виконання базових арифметичних
          операцій, а також роботи з числами у різних системах числення.
        </p>
        <div class="mb-5">
          <h3>Переваги</h3>
          <ul style="list-style-position: inside">
            <li>Швидка робота</li>
            <li>Зручний інтерфейс</li>
            <li>Підтримка різних режимів</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card-custom text-center">
          <h5>Багатобазове перетворення чисел</h5>
          <p class="text-secondary">
            Ця функція дозволяє швидко переводити числа з десяткової системи у двійкову,
            шістнадцяткову або вісімкову. Це дуже зручно, коли треба подивитися, як число виглядає в
            пам'яті комп'ютера або як його "бачить" процесор.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-custom text-center">
          <h5>Побітові операції</h5>
          <p class="text-secondary">
            Тут можна керувати кожним бітом числа окремо: вмикати їх, вимикати або міняти місцями за
            допомогою команд AND, OR, XOR та зсувів. Це потрібно для тих, хто працює з "залізом",
            створює прапорці або хоче максимально оптимізувати свій код.
          </p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card-custom text-center">
          <h5>Парсер математичних виразів</h5>
          <p class="text-secondary">
            Обчислення цілих рядків. Тобі не потрібно рахувати кожну дію окремо. Просто вписуєш
            довгий приклад із дужками, множенням та додаванням, а калькулятор сам розбереться, що
            зробити спочатку, а що потім. Він рахує все за правилами математики і не помиляється в
            черговості дій.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// No logic needed for about page
</script>

<style scoped>
.card-custom {
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

h1 {
  color: #0091d5;
  margin-bottom: 10px;
}

h5 {
  color: #0091d5;
  margin-bottom: 15px;
}
</style>
