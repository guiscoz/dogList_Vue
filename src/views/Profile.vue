<template>
  <div class="container">
    <div id="dog-table" >
      <h1>Bem vindo, {{ this.name }}</h1>
      <h2 v-if="dogs">Veja os cachorros já cadastrados por você</h2>
      <div id="dog-table-rows" v-if="dogs">
        <div class="dog-table-row" v-for="dog in dogs" :key="dog.id" >
          <div class="dog-table-column">
            <img v-if="dog.img_path" :src="`${image_api}/storage/${dog.img_path}`" :alt="dog.name" class="dog-picture">
            <img v-else src="@/assets/imgs/noImage.jpg" :alt="dog.name" class="dog-picture">
          </div>
          <div class="dog-table-column">
            <div class="dog-data">
              <p><b>Nome:</b> {{dog.name}}</p>
              <p><b>Raça:</b> {{dog.breed}}</p>
              <p><b>Sexo:</b> {{dog.gender == "M" ? "Masculino" : "Feminino"}}</p>
              <p><b>{{dog.is_public == "1" ? "Público" : "Visível apenas no seu perfil"}}</b></p>
              <div class="btn-group" id="actions">
                  <a :href="'/editar-cachorro/'+dog.id" class="btn btn-primary">Editar</a>
                  <!-- <button>Editar</button> -->
                  <button @click="DeleteDog(dog.id)" class="btn btn-danger">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="pagination" v-if="pages > 1">
      <button v-for="index in pages" :key="index" @click="UserData(index)" :class="{active: index == current_page}">{{index}}</button>
    </div>
  </div>
</template>

<script>
    import api from '@/services/api'
import axios from 'axios'
    const token = document.cookie.split('=')[1]

    export default {
        /* eslint-disable */
        name: "Profile",
        data() {
            return {
                name: null,
                id: null,
                dogs: null,
                pages: null,
                current_page: null,
                image_api: api.slice(0, -3)
            }
        },
        methods: {
            async UserData(page) {
                await axios.get(`${api}/get_user?page=${page}`, {
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
                await axios.delete(`${api}/dog_list/delete/${id}`, {
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

<style scoped>
  #pagination {
    margin-bottom: 1%;
  }

  .active {
    color: red;
  }

  #dog-table {
      max-width: 500px;
      margin: 3% auto 0;
  }

  .dog-table-row {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 225px;
      margin-bottom: 3%;
      border: 1px solid #333;
  }

  .dog-table-column {
    margin: auto 0;
  }

  .dog-picture {
      max-height: 100px;
      max-width: 100px;
  }

  .dog-data {
    font-size: 12px;
  }

  .dog-data b {
    font-size: 10px;
  }

  .btn {
    font-size: 7px;
  }

  @media only screen and (min-width: 400px) {
    #dog-table {
      max-width: 500px;
    }

    .dog-table-row {
      height: 300px;
    }

    .dog-picture {
      max-height: 200px;
      max-width: 200px;
    }

    .dog-data {
      font-size: 18px;
    }

    .dog-data b {
      font-size: 15px;
    }

    .btn {
    font-size: 15px;
  }
  }

  @media only screen and (min-width: 750px) {
    #dog-table {
      max-width: 1200px;
    }

    .dog-table-row {
      height: 450px;
    }

    .dog-picture {
      max-height: 400px;
      max-width: 400px;
    }

    .dog-data {
      font-size: 25px;
    }

    .dog-data b {
      font-size: 20px;
    }
  }
</style>