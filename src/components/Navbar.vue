<template>
    <nav>
        <a id="logo" href="/">
            <img src="@/assets/dogList_logo.png" alt="doglist-logo">
        </a>
        <a href="/">Lista de cachorros</a>
        <a href="/cadastro-cachorro">Cadastrar cachorros</a>
        <a href="/login">Login</a>
        <a href="/cadastro-usuario">Cadastrar usuário</a>
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
        border-bottom: 2px solid #333;
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

    #logo {
        margin: auto;
        margin-left: 0;
    }
</style>