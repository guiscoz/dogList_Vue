<template>
    <div id="dog-table-row">
        <div class="dog-table-column">
            <img v-if="dog.img_path" :src="`${getImageUrl(dog.img_path)}`" :alt="dog.name" class="dog-picture">
            <img v-else src="@/assets/imgs/noImage.jpg" :alt="dog.name" class="dog-picture">
        </div>
        <div class="dog-table-column">
            <div class="dog-data">
                <p><b>Nome:</b> {{dog.name}}</p>
                <p><b>Raça:</b> {{dog.breed}}</p>
                <p><b>Sexo:</b> {{dog.gender == "M" ? "Masculino" : "Feminino"}}</p>
                <p v-if="profile_page"><b>{{dog.is_public == "1" ? "Público" : "Visível apenas no seu perfil"}}</b></p>
                <div class="btn-group" id="actions" v-if="profile_page">
                    <a :href="'/editar-cachorro/'+dog.id" class="btn btn-primary">Editar</a>
                    <button @click="DeleteDog(dog.id)" class="btn btn-danger">Excluir</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import './DogCard.css'
  import api from '@/services/api'
  import axios from 'axios'
  import getToken from '@/services/getToken'

  export default {
    /* eslint-disable */
    name: "DogCard",
    props: {
        dog: {
            type: Object,
            required: true
        },
        profile_page: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        async DeleteDog(id) {
            const token = await getToken()

            await axios.delete(`${api}/dogs/delete/${id}`, {
                headers: {
                'Authorization': `Bearer ${token}`
                },
            })
            .then(() => {
                alert('Remoção feita com sucesso')
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getImageUrl(imgPath) {
            const baseUrl = api.replace('/api', '/')
            console.log(baseUrl)
            return `${baseUrl}storage/${imgPath}`
        }
    },
  }
</script>