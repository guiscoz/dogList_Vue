<template>
    <nav>
        <a id="logo" href="/">
            <img src="@/assets/dogList_logo.png" alt="doglist-logo">
        </a>

        <div v-if="logged" class="condicional-links">
            <a href="/perfil">Perfil</a>
            <a href="/cadastro-cachorro">Adicionar cachorro</a>
            <button id="logout-button" @click="Logout">Logout</button>
        </div>
        <div v-else class="condicional-links">
            <a href="/login">Login</a>
            <a href="/cadastro-usuario">Cadastrar</a>
        </div>
    </nav>
</template>

<script>
    import './Navbar.css'
    import api from '@/services/api'
    import axios from 'axios'
    import token from '@/services/token'

    export default {
        /* eslint-disable */
        name: 'Navbar',
        data() {
            return {
                logged: false
            }
        },
        methods: {
            async Logout(e) {
                // console.log(token)
                await axios.get(`${api}/logout`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    document.cookie = "user_token=; max-age=0; path=/";
                    this.logged = false
                    this.$router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            CheckLogin() {
                if (document.cookie.indexOf('user_token') == -1) {
                    this.logged = false
                } else {
                    // token = document.cookie.split('=')[1]
                    this.logged = true
                }
            }
        },
        mounted() {
            this.CheckLogin()
        },
        watch: {
            $route(to, from) {
                this.CheckLogin()
            }
        }
    }
</script>