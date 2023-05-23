<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
}>()

const localValue = computed({
  get(): string {
    return props.modelValue
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <div class="field">
    <label :for="name" class="label" data-test-id="TextInput_label">
      <slot name="label" />
    </label>
    <input
      v-model="localValue"
      type="text"
      :name="name"
      :id="name"
      class="input"
      data-test-id="TextInput_input"
    />
  </div>
</template>

<style scoped>
@import '@/components/form/input.css';
</style>
