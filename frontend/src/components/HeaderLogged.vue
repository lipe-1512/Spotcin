<template>
    <div>
        <router-link to="/">
            <button id="home">Home</button>
        </router-link>
        <router-link to="/recommendations">
            <button >Recomendações</button>
        </router-link>
        <router-link to="/playlists">
            <button >Playlists</button>
        </router-link>
        <router-link to="/history">
            <button >Histórico</button>
        </router-link>
        <router-link to="/account">
            <button >Conta</button>
        </router-link>
        <router-link to="/login">
            <button @click="logout">Logout</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">
const logout = () => {
  localStorage.setItem('isLoggedIn', JSON.stringify(false))
}


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
#home {
    background-color: grey;
    color: white;
}
</style>