<template>
    <div class="dog-edit">
        <h1>Edição de cachorro:</h1>

        <div v-if="!this.is_loading">
            <div id="image-column">
                <img 
                    v-if="current_img" 
                    :src="`${image_api}/storage/${current_img}`" 
                    :alt="name" 
                    id="dog-picture" 
                />
                <img 
                    v-else 
                    src="@/assets/imgs/noImage.jpg" 
                    :alt="name" 
                    class="dog-picture" 
                />
            </div>

            <div v-if="current_img" id="erase-image">
                <button @click="DeleteImage(dog_id)">Apagar imagem</button>
            </div>

            
            <DogForm 
                :initialData="dogData" 
                :submitButtonLabel="'Edite seu cachorro!'" 
                @submit="editDog" 
            ><input type="hidden" name="_method" value="PUT"></DogForm>
        </div>
        <div v-else>
            <p>Carregando dados do cachorro...</p>
        </div>
    </div>
</template>
  
<script>
    import "./PageForm.css"
    import api from "@/services/api"
    import axios from "axios"
    import DogForm from "@/components/dogs/DogForm.vue"
    import getToken from "@/services/getToken"

    const dog_id = window.location.href.split("/").pop()

    export default {
        name: "DogEdit",
        components: { DogForm },
        data() {
            return {
                dogData: {
                    name: null,
                    breed: null,
                    gender: null,
                    is_public: false,
                    img_path: null,
                },
                current_img: null,
                image_api: api.slice(0, -3),
                is_loading: true,
                token: null
            }
        },
        methods: {
            async fetchToken() {
                this.token = await getToken()
            },
            async fetchDogData() {
                const response = await axios.get(`${api}/dogs/current_dog/${dog_id}`, {
                    headers: { Authorization: `Bearer ${this.token}` },
                })

                const data = response.data

                if (!data) {
                    alert("Cachorro não encontrado!")
                    history.back()
                }

                this.dogData = {
                    name: data.name,
                    breed: data.breed,
                    gender: data.gender,
                    is_public: data.is_public,
                    img_path: null,
                }
                
                this.current_img = data.img_path
            },
            async editDog(formData) {
                const dogData = {
                    ...formData,
                    is_public: formData.is_public ? 1 : 0,
                }

                await axios.post(`${api}/dogs/update/${dog_id}?_method=PUT`, dogData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.token}`,
                    },
                })
                .then(() => {
                    alert("Atualização feita com sucesso")
                    window.location.reload()
                })
                .catch((error) => {
                    console.error(error)
                })
            },
            async DeleteImage() {
                const noImage = {
                    img_path: null
                }

                await axios.post(`${api}/dogs/delete_image/${dog_id}?_method=PUT`, noImage, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${this.token}`
                    },
                })
                .then(() => {
                    alert('Imagem removida com sucesso')
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            },
        },
        async mounted() {
            await this.fetchToken()
            await this.fetchDogData().then(() => {
                this.is_loading = false
            })
        },
    }
</script>  