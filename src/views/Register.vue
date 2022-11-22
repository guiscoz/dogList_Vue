<template>
    <form method="POST" @submit="Register">
        <h1 class="h3 mb-3 fw-normal">Faça seu cadastro</h1>

        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" v-model="name">
            <label for="floatingInput">Nome de usuário</label>
        </div>

        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" v-model="email">
            <label for="floatingInput">Email</label>
        </div>

        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" v-model="password">
            <label for="floatingPassword">Senha</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
    </form>
</template>

<script>
    import axios from 'axios'

    export default {
        /* eslint-disable */
        name: "Register",
        data() {
            return {
                name: null,
                email: null,
                password: null
            }
        },
        methods: {
            async Register(e) {
                e.preventDefault()

                const RegisterData = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }

                axios.post('http://127.0.0.1:8000/api/register', RegisterData)
                .then(response => {
                    let token = response.data.token
                    let date = new Date()
                    let expires = date.setDate(date.getDate() + 1)

                    document.cookie = `user_token=${token};expires=${expires}`
                    this.$router.push('/perfil')
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    form {
        width: 250px;
        margin: 15% auto 0;
    }

    .form-floating {
        margin-bottom: 5%;
    }
</style>