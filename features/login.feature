Feature: Login
    As a user
    I want to be able to login to the application
    So that I can access my account

    Scenario: Cadastro com sucesso
        Given o usuário está na página "cadastro"
        And não existe um usuário cadastrado com email "john_2@example.com"
        When o usuário insere um email válido "john_2@example.com"
        And o usuário insere uma senha válida "novaSenha123"
        And o usuário insere seu nome "John Jones"
        And o usuário seleciona a opção "Cadastrar"
        Then o usuário é cadastrado com sucesso
        And o usuário deve ser redirecionado para a página "inicial"
        And deve ver uma mensagem "Cadastro realizado com sucesso! Bem-vindo"

    Scenario: Cadastro com email existente
        Given o usuário está na página "cadastro"
        And existe um usuário cadastrado com email "john_2@example.com"
        When o usuário insere um email válido "john_2@example.com"
        And o usuário insere uma senha válida "novaSenha123"
        And o usuário insere seu nome "John Jones"
        And o usuário seleciona a opção "Cadastrar"
        Then o usuário permanece na página "cadastro"
        And uma mensagem de erro "email já cadastrado" deve ser exibida

    Scenario: Login com senha incorreta
        Given o usuário está na página "login"
        And existe um usuário cadastrado no sistema com email "john@example.com" e senha "secretpassword"
        When o usuário insere "john@example.com" no campo "email"
        And o usuário insere "senhaIncorreta" no campo "senha"
        And o usuário  seleciona a opção "Entrar"
        Then o usuário permanece na página "login"
        And uma mensagem de erro "senha incorreta" deve ser exibida
        And o usuário não deve estar logado

    Scenario: Login com sucesso
        Given o usuário está na página "login"
        And existe um usuário cadastrado no sistema com email "john@example.com" e senha "secretpassword"
        When o usuário insere "john@example.com" no campo "email"
        And o usuário insere "secretpassword" no campo "senha"
        And o usuário seleciona a opção "Entrar"
        Then o usuário deve ser redirecionado para a página "inicial"
        And o usuário deve estar autenticado
