<script setup lang="ts">
import HeaderNotLogged from './components/HeaderNotLogged.vue'
import HeaderLogged from './components/HeaderLogged.vue'

import { RouterView, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

const isLoggedIn = ref(false)
const route = useRoute()

function checkLoginState() {
  const loggedState = localStorage.getItem('isLoggedIn')
  isLoggedIn.value = loggedState ? JSON.parse(loggedState) : false
}

onMounted(() => {
  checkLoginState()
})

watch(() => route.path, () => {
  checkLoginState()
})
</script>

<template>
  <div class="layout">
    <div class="nav-bar">
      <HeaderNotLogged v-if="!isLoggedIn"/>
      <HeaderLogged v-else/>
    </div>

    <div class="page">
      <RouterView/>
    </div>
  </div>
</template>

<style>
.nav-bar{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: black;
  margin-bottom: 25px;
}
</style>