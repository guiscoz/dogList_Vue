<template>
    <div class="dog-edit">
        <h1>Edição de cachorro:</h1>
        <div id="image-column">
            <img v-if="this.current_img" :src="`http://127.0.0.1:8000/storage/${this.current_img}`" :alt="name" id="dog-picture">
            <img v-else src="@/assets/imgs/noImage.jpg" :alt="name" class="dog-picture">
        </div>
        <div id="edit_column">
            <form id="dog-form" @submit="EditDog" enctype="multipart/form-data">
                <input type="hidden" name="_method" value="PUT">

                <div class="input-container">
                    <label for="name">Nome do cachorro:</label>
                    <input type="text" id="name" name="name" v-model="name" placeholder="Digite o nome do seu cachorro">
                </div>

                <div class="input-container">
                    <label for="breed">Raça do cachorro:</label>
                    <input type="text" id="breed" name="breed" v-model="breed" placeholder="Digite a raça do seu cachorro" >
                </div>

                <div class="input-container">
                    <label for="gender">Sexo do cachorro:</label>
                    <select name="gender" id="gender" v-model="gender">
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>

                <div class="input-container">
                    <label for="img_path">Trocar foto?</label>
                    <input type="file" id="img_path" name="img_path" accept="image/*png,jpg,jpeg" placeholder="Escolha um arquivo de foto" @change="newFile">
                </div>

                <div class="checkbox-container">
                    <label id="public-title" for="public">Público? <i class="fa fa-question-circle tips" aria-hidden="true" title="Sendo público, o seu cachorro irá aparecer na página inicial do site para todo mundo ver."></i></label>
                    <input type="checkbox" name="public" v-model="is_public" :checked="is_public">
                </div>

                <div class="input-container">
                    <input class="submit-btn" type="submit" value="Edite seu cachorro!">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import api from '@/services/api'
    const token = document.cookie.split('=')[1]
    const dog_id = window.location.href.split('/').pop()

    export default {
        name: "DogEdition",
        data() {
            return {
                id: dog_id,
                name: null,
                breed: null,
                gender: null,
                is_public: null,
                img_path: null,
                current_img: null
            }
        },
        methods: {
            /* eslint-disable */
            async DogData() {
                await axios.get(`${api}/dog_list/current_dog/${dog_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    if(response.data.length == 0) {
                        alert('Este cachorro não está disponível no banco de dados')
                        history.back()
                    } else {
                        this.name = response.data.name
                        this.breed = response.data.breed
                        this.gender = response.data.gender
                        this.is_public = response.data.is_public
                        this.current_img = response.data.img_path
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert('Não foi possível acessar dados desse cachorro')
                    history.back()
                })
            },
            async EditDog(e) {
                e.preventDefault()

                const dogData = {
                    name: this.name,
                    breed: this.breed,
                    gender: this.gender,
                    is_public: this.is_public ? 1 : 0,
                    img_path: this.img_path
                }

                await axios.post(`${api}/dog_list/update/${dog_id}?_method=PUT`, dogData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert('Atualização feita com sucesso')
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                    console.log(dogData)
                })
            },
            newFile(event) {
                this.img_path = event.target.files[0]
            }
        },
        mounted() {
            this.DogData()
        }
    }
</script>

<style scoped>
  h1 {
    margin-top: 3%;
  }

  #dog-edit {
      max-width: 1000px;
      display: flex;
      justify-content: space-between;
  }

  #image-column img {
      max-width: 450px;
      margin-top: 1%;
  }

  #dog-form {
    max-width: 500px;
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
    color: #222;
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