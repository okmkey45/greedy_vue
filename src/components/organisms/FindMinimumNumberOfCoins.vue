<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from '@/components/atoms/AppButton.vue'
import CoinsForChangeOutput from '@/components/organisms/CoinsForChangeOutput.vue'
import CoinListInput from '@/components/molecules/CoinListInput.vue'
import NumberInput from '@/components/form/NumberInput.vue'
import TheInstructions from '@/components/organisms/TheInstructions.vue'
import useGreedy from '@/composables/useGreedy'

const { findMinimumNumberOfCoins } = useGreedy()

const coinList = ref([1, 5, 10, 25, 50])
const change = ref(63)

const coinsForChange = ref(0)

const coinListIsEmpty = computed(() => coinList.value.length === 0)

const compute = () => {
  coinsForChange.value = findMinimumNumberOfCoins(coinList.value, change.value)
}
</script>

<template>
  <div class="max-w-sm">
    <div class="space-y-3">
      <h2 class="text-xl text-center">
        <span class="font-semibold">Find minimum number of coins</span>
        <br />
        <span>(Greedy Algorithm)</span>
      </h2>
      <TheInstructions data-test-id="FindMinimumNumberOfCoins_theInstructions" />
      <hr />
      <div class="flex space-x-3">
        <CoinListInput
          v-model:coin-list="coinList"
          data-test-id="FindMinimumNumberOfCoins_coinListInput"
        />
        <NumberInput
          v-model="change"
          name="change"
          data-test-id="FindMinimumNumberOfCoins_changeInput"
        >
          <template v-slot:label>Change</template>
        </NumberInput>
      </div>
      <!-- TODO: is it worth creating a new component for this error message? -->
      <p
        v-if="coinListIsEmpty"
        class="text-center text-red-500 text-sm"
        data-test-id="FindMinimumNumberOfCoins_errorMessage"
      >
        Coin list must have at least one coin
      </p>
      <div class="text-center">
        <AppButton
          :disabled="coinListIsEmpty"
          @click="compute"
          data-test-id="FindMinimumNumberOfCoins_computeButton"
        >
          Compute
        </AppButton>
        <div class="mt-3">
          <CoinsForChangeOutput data-test-id="FindMinimumNumberOfCoins_coinsForChangeOutput">
            <template v-slot:output>{{ coinsForChange }}</template>
          </CoinsForChangeOutput>
        </div>
      </div>
    </div>
  </div>
</template>
