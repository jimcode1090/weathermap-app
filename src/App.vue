<script setup>
import {useWeatherMapViewModel} from "./viewmodels/useWeatherMapViewModel";
import Form from "./components/Form.vue";
import Alert from "./components/Alert.vue";

const {
  countries,
  formData,
  errors,
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
  </div>

</template>


