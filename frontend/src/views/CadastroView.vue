<script setup lang="ts">

import {useApiService} from '../services/apiService';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

const {postUser} = useApiService();
let name = '';
let email = '';
let password = '';
let passwordConfirmation = '';
const isLoggedIn = ref(false)

const submitForm = async () => {
    let req_body = {
        name: name,
        email: email,
        password: password
    }
    if(password === passwordConfirmation){
        console.log('Senhas iguais');
        let response = await postUser(req_body);
        if(response.code == 200){
            console.log('Usuário cadastrado com sucesso');
            console.log('Form submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);
            // quando cadastrado, redireciona para a pagina de login
            router.push('/login');
        }else{
            console.log('Erro ao cadastrar usuário');
            console.log(response);
        }
    }else{
        console.log('Senhas diferentes');
    }
};

function checkLoginState() {
    const loggedState = localStorage.getItem('isLoggedIn')
    isLoggedIn.value = loggedState ? JSON.parse(loggedState) : false
}

onMounted(() => {
    checkLoginState()
    if (isLoggedIn.value) {
        router.push('/')
    }
})

</script>

<template>
    <div class="form-container">
        <h1>Cadastre-se</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nome:</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div class="form-group">
                <label for="password-confirmation">Confirme a senha:</label>
                <input type="password" id="password-confirmation" v-model="passwordConfirmation" required>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>