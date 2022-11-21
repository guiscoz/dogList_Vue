<template>
  <div class="dog-register">
    <h1>Cadastro de cachorro:</h1>
    <StoreForm />
  </div>
</template>

<script>
import StoreForm from '../components/StoreForm.vue'

export default {
  name: "DogRegister",
  components: {
    StoreForm
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 3%;
  }
</style>