<template>
  <div class="dog-register">
    <h1>Cadastro de cachorro:</h1>

    <DogForm 
      :submitButtonLabel="'Registre seu cachorro!'" 
      @submit="registerDog" 
    />
  </div>
</template>

<script>
  import "./PageForm.css"
  import api from '@/services/api'
  import axios from 'axios'
  import DogForm from '@/components/dogs/DogForm.vue'
  import getToken from '@/services/getToken'

  export default {
    name: "DogCreate",
    components: { DogForm },
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
      async registerDog(formData) {
        const token = await getToken()

        const dogData = {
          ...formData,
          is_public: formData.is_public ? 1 : 0,
        };

        await axios.post(`${api}/dogs/store`, dogData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
          },
        })
        .then(() => {
          alert('Cadastro feito com sucesso')
          window.location.reload()
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