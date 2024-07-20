Feature: Login

  Scenario: Login de usuário com credenciais válidas
    Given existe um usuário no sistema com email "john@example.com" e senha "password"
    When uma requisição POST for enviada para "/api/login" com o body da requisição contendo o email "john@example.com" e senha "password"
    Then o status code da resposta deve ser "200"
    And o JSON da resposta deve conter a msgCode "success"

  Scenario: Login de usuário com credenciais inválidas
    Given existe um usuário no sistema com email "john@example.com" e senha "password"
    When uma requisição POST for enviada para "/api/login" com o body da requisição contendo o email "john@example.com" e senha "outrasenha"
    Then o status code da resposta deve ser "400"
    And o JSON da resposta deve conter a msgCode "incorrect_password"

  Scenario: Login de usuário com credenciais em branco
    Given existe um usuário no sistema com email "john@example.com" e senha "password"
    When uma requisição POST for enviada para "/api/login" com o body da requisição contendo o email "john@example.com" e senha ""
    Then o status code da resposta deve ser "500"
    And o JSON da resposta deve conter a msgCode "failure"
