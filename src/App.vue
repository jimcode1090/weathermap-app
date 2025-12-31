<script setup>
import {useWeatherMapViewModel} from "./viewmodels/useWeatherMapViewModel";
import Form from "./components/Form.vue";
import Weather from "./components/Weather.vue";
import Spinner from "./components/Spinner.vue";
import Alert from "./components/Alert.vue";

const {
  loading,
  countries,
  currentWeather,
  formData,
  errors,
  showWeather,
  fetchWeather
} = useWeatherMapViewModel()

</script>

<template>
  <h1 class="titulo">Buscador de clima</h1>
  <div class="contenedor buscador-clima">
    <Form
        :countries="countries"
        :formData="formData"
        :errors="errors"
        @get-weathermap="fetchWeather"
    />
    <Spinner v-if="loading" />
    <Alert v-if="errors.general">
      {{ errors.general }}
    </Alert>
    <Weather v-if="showWeather" :weather="currentWeather"/>
  </div>

</template>


