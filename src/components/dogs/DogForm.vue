<template>
    <form id="dog-form" @submit.prevent="submitHandler" enctype="multipart/form-data">
        <div class="input-container">
            <label for="name">Nome do cachorro:</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                v-model="formData.name" 
                placeholder="Digite o nome do seu cachorro" 
            />
        </div>

        <div class="input-container">
            <label for="breed">Raça do cachorro:</label>
            <input 
                type="text" 
                id="breed" 
                name="breed" 
                v-model="formData.breed" 
                placeholder="Digite a raça do seu cachorro" 
            />
        </div>

        <div class="input-container">
            <label for="gender">Sexo do cachorro:</label>
            <select name="gender" id="gender" v-model="formData.gender">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
            </select>
        </div>

        <div class="input-container">
            <label for="img_path">Foto do cachorro (opcional):</label>
            <input 
                type="file" 
                id="img_path" 
                name="img_path" 
                accept="image/*png,jpg,jpeg" 
                @change="handleFileChange"
            />
        </div>

        <div class="checkbox-container">
            <label id="public-title" for="public">
                Público? 
                <i 
                class="fa fa-question-circle tips" 
                aria-hidden="true" 
                title="Sendo público, o seu cachorro irá aparecer na página inicial do site para todo mundo ver."
                ></i>
            </label>
            <input type="checkbox" name="public" v-model="formData.is_public" />
        </div>

        <div class="input-container">
            <input class="submit-btn" type="submit" :value="submitButtonLabel" />
        </div>
    </form>
</template>

<script>
    import "./DogForm.css"

    export default {
        name: "DogForm",
        props: {
            initialData: {
                type: Object,
                default: () => ({
                    name: "",
                    breed: "",
                    gender: "",
                    img_path: null,
                    is_public: false,
                }),
            },
            submitButtonLabel: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                formData: { ...this.initialData, is_public: Boolean(this.initialData.is_public) },
            };
        },
        methods: {
            handleFileChange(event) {
                this.formData.img_path = event.target.files[0]
            },
            submitHandler() {
                this.$emit("submit", this.formData)
            },
        },
        watch: {
            initialData: {
                handler(newData) {
                    this.formData = {
                        ...newData,
                        is_public: Boolean(newData.is_public),
                    };
                },
                immediate: true,
                deep: true
            }
        },
        mounted() {
            console.log(this.is_public)
        }
    };
</script>