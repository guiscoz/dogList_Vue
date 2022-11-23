<template>
  <div class="dog-register">
    <h1>Cadastro de cachorro:</h1>
    <form id="dog-form" method="POST" @submit="registerDog" enctype="multipart/form-data">
        <div class="input-container">
          <label for="name">Nome do cachorro:</label>
          <input type="text" id="name" name="name" v-model="name" placeholder="Digite o nome do seu cachorro">
        </div>

        <div class="input-container">
          <label for="breed">Raça do cachorro:</label>
          <input type="text" id="breed" name="breed" v-model="breed" placeholder="Digite a raça do seu cachorro">
        </div>

        <div class="input-container">
          <label for="gender">Sexo do cachorro:</label>
          <select name="gender" id="gender" v-model="gender">
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
          </select>
        </div>

        <div class="input-container">
          <label for="img_path">Foto do cachorro (opcional):</label>
          <input type="file" id="img_path" name="img_path" accept="image/*png,jpg,jpeg" placeholder="Digite a raça do seu cachorro" @change="newFile">
        </div>

        <div class="checkbox-container">
          <label id="public-title" for="public">Público? <i class="fa fa-question-circle tips" aria-hidden="true" title="Sendo público, o seu cachorro irá aparecer na página inicial do site para todo mundo ver."></i></label>
          <input type="checkbox" name="public" v-model="is_public">
        </div>

        <div class="input-container">
          <input class="submit-btn" type="submit" value="Register seu cachorro!">
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/services/api'
const token = document.cookie.split('=')[1]

export default {
  name: "DogRegister",
  data() {
    return {
      name: null,
      breed: null,
      gender: null,
      img_path: null,
      is_public: null
    }
  },
  methods: {
    async registerDog(e) {
      e.preventDefault()

      const dogData = {
        name: this.name,
        breed: this.breed,
        gender: this.gender,
        is_public: this.is_public ? 1 : 0,
        img_path: this.img_path
      }

      console.log(dogData)
      // link do backend do Vue: http://localhost:3000/dogs
      await axios.post(`${api}/dog_list/store`, dogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        },
      })
      .catch((error) => {
          console.log(error)
      })
    },

    newFile(event) {
      this.img_path = event.target.files[0]
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 3%;
  }

  #dog-form {
    max-width: 800px;
    margin: 3% auto 0;
  }

  .input-container {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
  }

  .input-container input, select {
    padding: 5px;
    width: 300px;
  }

  .checkbox-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
  }

  .checkbox-container input{
    height: 20px;
    width: 20px;
  }
</style>