Feature: Users

  Scenario: Criar um novo usuário
    Given o UserRepository não tem um usuário com email "john@example.com"
    When uma requisição POST for enviada para "/api/users" com o corpo da requisição sendo um JSON com o nome "John Jones", o email "john@example.com" e a senha "password"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "John Jones", o email "john@example.com" e a senha "password"

  Scenario: Criar um novo usuário com email já existente
    Given o UserRepository tem um usuário com email "john@example.com"
    When uma requisição POST for enviada para "/api/users" com o corpo da requisição sendo um JSON com o nome "John Jones", o email "john@example.com" e a senha "password"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem "Email already exists"

  Scenario: Atualiza nome do usuário
    Given o UserRepository tem um usuário com email "john@example.com", e o nome "John Doe"
    When uma requisição PUT for enviada para "/api/users/:id" com o id do usuário "john@example.com", o corpo da requisição sendo um JSON com o nome "Joseph Doe", o email e senha "password"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "Joseph Doe", o email "john@example.com" e a senha "password"

  Scenario: Deleta usuário
    Given o UserRepository tem um usuário com email "john@example.com"
    When uma requisição DELETE for enviada para "/api/users/:id" com o id do usuário "john@example.com"
    Then o status da resposta deve ser "200"
    And não deve haver mais o usuário com email "john@example.com"