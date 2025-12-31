<script setup>
import { formatTemperature } from "../helpers/formatWeather.js";

defineProps({
  weather : {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="resultado">
    <h2>Clima de: {{ weather.name }}</h2>
    <p class="actual">{{ formatTemperature(weather.temp) }}&deg;</p>
    <div class="temperaturas">
      <p>Min: {{ formatTemperature(weather.temp_min) }}<span>&deg;C</span></p>
      <p>Max: {{ formatTemperature(weather.temp_max) }}<span>&deg;C</span></p>
    </div>
  </div>
</template>

<style scoped>

</style>