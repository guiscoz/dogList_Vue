<template>
    <div class="container">
    <div id="dog-table" >
      <h1>Bem vindo, {{ this.name }}</h1>
      <h2 v-if="dogs">Veja os cachorros já cadastrados por você</h2>
      <div id="dog-table-rows" v-if="dogs">
        <div class="dog-table-row" v-for="dog in dogs" :key="dog.id" >
          <div class="dog-table-column">
            <img v-if="dog.img_path" :src="`http://127.0.0.1:8000/storage/${dog.img_path}`" :alt="dog.name" class="dog-picture">
            <img v-else src="@/assets/imgs/noImage.jpg" :alt="dog.name" class="dog-picture">
          </div>
          <div class="dog-table-column">
            <div class="dog-data">
              <p><b>Nome:</b> {{dog.name}}</p>
              <p><b>Raça:</b> {{dog.breed}}</p>
              <p><b>Sexo:</b> {{dog.gender == "M" ? "Masculino" : "Feminino"}}</p>
              <p><b style="font-size: 18px">{{dog.is_public == "1" ? "Público" : "Visível apenas no seu perfil"}}</b></p>
              <div id="actions" style="display: flex; justify-content: space-between">
                  <a :href="'/editar-cachorro/'+dog.id">Editar</a>
                  <!-- <button>Editar</button> -->
                  <button @click="DeleteDog(dog.id)">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import api from '@/services/api'
    const token = document.cookie.split('=')[1]

    export default {
        /* eslint-disable */
        name: "Profile",
        data() {
            return {
                name: null,
                id: null,
                dogs: null
            }
        },
        methods: {
            async UserData() {
                await axios.get(`${api}/get_user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    this.name = response.data.user.name
                    this.id = response.data.user.id
                    this.dogs = response.data.dogs.data
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
            this.UserData()
        }
    }
</script>

<style scoped>
  #dog-table {
    max-width: 1200px;
    margin: 3% auto 0;
  }

  .dog-table-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 450px;
    margin-bottom: 3%;
    border: 1px solid #333;
  }

  .dog-table-column {
    margin: auto 0;
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
</style>