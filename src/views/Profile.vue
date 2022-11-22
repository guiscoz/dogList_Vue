<template>
    <div id="profile">
        <h1>Bem-vindo, {{ name }}.</h1>
    </div>
</template>

<script>
    import axios from 'axios'
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
                await axios.get(`http://127.0.0.1:8000/api/get_user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then(response => {
                    console.log(response)
                    this.name = response.data.name
                    this.id = response.data.id
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