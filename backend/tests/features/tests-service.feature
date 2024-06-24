Feature: Tests Service

# Service
Scenario: Return all tests
    Given o método getTests do TestService retorna um array com o test de nome "test" e nome "123"
    When o método getTests do TestService for chamado
    Then o array retornado deve conter o test de nome "test" e nome "123"

Scenario: Return test by nome
    Given o método getTest chamado com "123" do TestService retorna um test de nome "test" e nome "123"
    When o método getTest do TestService for chamado com o nome "123"
    Then o test retornado deve ter o nome "test" e nome "123"