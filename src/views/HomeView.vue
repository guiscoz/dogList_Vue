<template>
  <div class="home">
    <DogList />
  </div>
</template>

<script>
import DogList from '../components/DogList.vue'

export default {
  name: 'HomeView',
  components: {
    DogList
  }
}
</script>
