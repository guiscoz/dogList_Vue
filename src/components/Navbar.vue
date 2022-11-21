<template>
    <nav>
        <img src="@/assets/dogList_logo.png" alt="doglist-logo">
        <a href="/">Lista de cachorros</a>
        <a href="/dog-register">Cadastrar cachorros</a>
    </nav>
</template>

<script>
    export default {
        /* eslint-disable */
        name: 'Navbar'
    }
</script>

<style scoped>
    nav {
        padding: 15px 150px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    nav a {
        font-weight: bold;
        margin-right: 25px;
        text-decoration: none;
        color: #333;
    }

    nav a:hover {
        color: green;
    }

    nav a:active {
        color: greenyellow;
    }

    nav img {
        margin: auto;
        margin-left: 0;
    }
</style>