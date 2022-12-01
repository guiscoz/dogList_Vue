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
    import axios from 'axios'
    import api from '@/services/api'
    let token = document.cookie.split('=')[1]

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
                await axios.get(`${api}/logout`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    document.cookie = `${document.cookie};max-age=0`
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
                    token = document.cookie.split('=')[1]
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

<style scoped>
    nav {
        padding: 15px 25px;
        font-size: 10px;
        display: block;
        align-items: center;
        border-bottom: 2px solid #333;
    }

    nav a {
        font-weight: bold;
        margin-right: 15px;
        text-decoration: none;
        color: #333;
    }

    nav a:hover {
        color: green;
    }

    nav a:active {
        color: greenyellow;
    }

    #logo {
        margin: auto;
        margin-left: 0;
    }

    #logo img {
        max-width: 100%;
    }

    .condicional-links {
        margin-top: 15px;
    }

    @media only screen and (min-width: 540px) {
        nav {
            padding: 15px 75px;
            font-size: 12px;
            display: flex;
            justify-content: flex-end;
        }

        nav a {
            margin-right: 25px;
        }

        .condicional-links {
            margin-top: 0;
        }
    }

    @media only screen and (min-width: 775px) {
        nav {
            padding: 15px 150px;
            font-size: 15px;
        }
    }
</style>