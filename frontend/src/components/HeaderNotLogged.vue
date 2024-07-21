<template>
    <div>
        <router-link to="/login">
            <button id="login">Login</button>
        </router-link>
        <router-link to="/cadastro">
            <button id="cadastro">Cadastro</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

button {
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    color: black;
}
#login {
    background-color: gray;
    color: white;
}

</style>