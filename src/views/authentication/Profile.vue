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
  import token from '@/services/token'
  import DogCard from '@/components/dogs/DogCard.vue';

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
            image_api: api.slice(0, -3),
        }
    },
    methods: {
      async UserData(page) {
        setTimeout(() => {
          if (token === undefined) {
            window.location.reload();
          }
        }, 200);

        await axios.get(`${api}/user?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
            this.name = response.data.user.name
            this.id = response.data.user.id
            this.dogs = response.data.dogs.data
            this.pages = response.data.dogs.last_page
            this.current_page = response.data.dogs.current_page
        })
        .catch((error) => {
            console.log(error)
        })
      },
      async DeleteDog(id) {
        await axios.delete(`${api}/dogs/delete/${id}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            },
        })
        .then(() => {
            alert('Remoção feita com sucesso')
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
      }
    },
    mounted() {
        this.UserData(1)
    }
  }
</script>