<template>
  <div class="container">
    <div id="home-table" >
      <h1>Cachorros da galera</h1>
      <div v-if="dogs">
        <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" :profile_page="false" />
      </div>
      <div id="pagination" v-if="pages > 1">
        <button v-for="index in pages" :key="index" @click="getDogs(index)" :class="{active: index == current_page}">{{index}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import './Home.css'
  import DogCard from '@/components/dogs/DogCard.vue'
  import api from '@/services/api'
  import axios from 'axios'
  /* eslint-disable */

  export default {
    /* eslint-disable */
    name: 'HomeView',
    components: { DogCard },
    data() {
      return {
        dogs: null,
        pages: null,
        current_page: null,
        image_api: api.slice(0, -3)
      }
    },
    methods: {
      async getDogs(page) {
        await axios.get(`${api}/dogs?page=${page}`, {})
        .then(response => {
          this.dogs = response.data.data
          this.pages = response.data.last_page
          this.current_page = response.data.current_page
        })
        .catch(error => {console.log(error)})
      }
    },
    mounted() {
      this.getDogs(1)
    }
  }
</script>