<template>
  <div class="container">
    <div id="profile-table" >
      <h1>Bem vindo, {{ this.name }}</h1>
      <div v-if="dogs">
        <h2>Veja os cachorros já cadastrados por você</h2>
        <DogCard v-for="dog in dogs" :key="dog.id" :dog="dog" :profile_page="true" />
      </div>
    </div>
    <div id="pagination" v-if="pages > 1">
      <button v-for="index in pages" :key="index" @click="UserData(index)" :class="{active: index == current_page}">{{index}}</button>
    </div>
  </div>
</template>

<script>
  import './Profile.css'
  import api from '@/services/api'
  import axios from 'axios'
  import getToken from '@/services/getToken'
  import DogCard from '@/components/dogs/DogCard.vue'

  export default {
    /* eslint-disable */
    name: "Profile",
    components: { DogCard },
    data() {
        return {
            name: null,
            id: null,
            dogs: null,
            pages: null,
            current_page: null,
        }
    },
    methods: {
      async UserData(page) {
        const token = await getToken()

        try {
          const response = await axios.get(`${api}/user?page=${page}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          this.name = response.data.user.name
          this.id = response.data.user.id
          this.dogs = response.data.dogs.data
          this.pages = response.data.dogs.last_page
          this.current_page = response.data.dogs.current_page
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error)
        }
      },
    },
    mounted() {
        this.UserData(1)
    }
  }
</script>