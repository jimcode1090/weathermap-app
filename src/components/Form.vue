<script setup>

import Alert from "./Alert.vue";

defineProps({
  countries: {
    type: Array,
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['get-weathermap'])
const handleSubmit = () => {
  emit('get-weathermap')
}

</script>

<template>

  <form @submit.prevent="handleSubmit" class="formulario">
    <Alert v-if="errors.general">
      {{ errors.general }}
    </Alert>

    <div class="campo">
      <label for="city">Ciudad: </label>
      <input v-model="formData.city" type="text" name="city" id="city" placeholder="Ingrese la ciudad">
    </div>
    <div class="campo">
      <label for="country">País: </label>
      <select v-model="formData.country" name="country" id="country">
        <option value="">-- Seleccione un pais --</option>
        <option v-for="country in countries" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <input type="submit" value="Consultar Clima">
  </form>

</template>

<style scoped>

</style>