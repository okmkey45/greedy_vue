<template>
  <p class="py-3 bg-sky-100 rounded-md">
    <span>Minimum number of coins for change</span>
    <br />
    <span class="text-sky-700 text-2xl" data-test-id="CoinsForChangeOutput_output">
      <slot name="output" />
    </span>
  </p>
</template>
