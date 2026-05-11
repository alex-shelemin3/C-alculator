<template>
  <div
    class="position-fixed bottom-0 end-0 p-3"
    style="z-index: 9999"
  >
    <div
      :class="['alert', `alert-${type}`, 'mb-0', 'shadow']"
      role="alert"
      style="min-width: 260px; animation: slideIn 0.3s ease;"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'danger', 'warning', 'info'].includes(value)
  }
})
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
