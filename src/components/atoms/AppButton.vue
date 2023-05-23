<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)
</script>

<template>
  <button class="app-button" :disabled="disabled" data-test-id="AppButton_button">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  @apply inline-block rounded-md px-3 py-2 text-sm tracking-wider bg-sky-600 font-semibold text-white shadow-md shadow-sky-400;
}

.app-button:focus {
  @apply outline-none;
}

.app-button:hover {
  @apply bg-sky-700;
}

.app-button:active {
  @apply bg-sky-300;
}

.app-button:disabled {
  @apply cursor-not-allowed bg-sky-200 shadow-none;
}
</style>
