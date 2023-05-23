<script setup lang="ts">
import { computed } from 'vue'

import TextInput from '@/components/form/TextInput.vue'

const props = defineProps<{
  coinList: number[]
}>()

const emit = defineEmits<{
  (event: 'update:coinList', coinList: number[]): void
}>()

const separator = ','

const rawCoinList = computed({
  get(): string {
    return props.coinList.join(separator)
  },
  set(newRawCoinList: string) {
    if (newRawCoinList.endsWith(separator)) {
      // don't perform the update when separator is added
      return
    }

    if (newRawCoinList === '') {
      emit('update:coinList', [])
      return
    }
    // TODO: add validation for receiving a proper string
    const newCoinList = newRawCoinList.split(separator).map((coinStr) => Number(coinStr))
    emit('update:coinList', newCoinList)
  }
})
</script>

<template>
  <div>
    <TextInput v-model="rawCoinList" name="coinList" data-test-id="CoinListInput_input">
      <template v-slot:label>Coin list</template>
    </TextInput>
  </div>
</template>
