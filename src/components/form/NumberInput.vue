<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  modelValue: number
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: number): void
}>()

const localValue = computed({
  get(): number {
    return props.modelValue
  },
  set(newValue: number) {
    if (!newValue) {
      return
    }
    emit('update:modelValue', newValue)
  }
})

const checkValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    emit('update:modelValue', 0)
  }
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label" data-test-id="NumberInput_label">
      <slot name="label" />
    </label>
    <input
      v-model.number="localValue"
      type="number"
      :name="name"
      :id="name"
      class="input"
      @blur="checkValue"
      data-test-id="NumberInput_input"
    />
  </div>
</template>

<style scoped>
@import '@/components/form/input.css';
</style>
