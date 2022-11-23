<template>
    <div id="profile">
        <h1>Bem-vindo, {{ name }}.</h1>
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
                id: null
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
                    this.name = response.data.name
                    this.id = response.data.id
                    console.log(response)
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