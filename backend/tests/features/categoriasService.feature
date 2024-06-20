Feature: Categorias Service

# Service
Scenario: Retornar todas as categorias
    Given o método getCategorias do CategoriaService retorna um array com as categorias “Para dormir”, “Para o rolê”, “Para ouvir no carro”
    When o método getCategorias do CategoriaService for chamado
    Then o array retornado deve conter as categorias “Para dormir”, “Para o rolê”, “Para ouvir no carro”

Scenario: Retornar categoria por nome
    Given o método getCategoria chamado com “Para o rolê” do CategoriaService retorna uma categoria de nome “Para o rolê”
    When o método getCategoria do CategoriaService for chamado com o nome “Para o rolê”
    Then a categoria retornada deve ter o nome “Para o rolê”

Scenario: Criar uma nova categoria
    Given o método createCategoria do CategoriaService com o nome “Sad vibes” não retorna erro
    When o método createCategoria do CategoriaService for chamado com o nome “Sad vibes”
    Then uma nova categoria com o nome “Sad vibes” deve ser criada

Scenario: Criar uma categoria que já existe
    Given o método createCategoria do CategoriaService com o nome “Para o rolê” retorna um erro de duplicação
    When o método createCategoria do CategoriaService for chamado com o nome “Para o rolê”
    Then deve ser retornado um erro informando que a categoria já existe

Scenario: Excluir uma categoria
    Given o método deleteCategoria do CategoriaService com o nome “classic rock para treino” não retorna erro
    When o método deleteCategoria do CategoriaService for chamado com o nome “classic rock para treino”
    Then a categoria “classic rock para treino” deve ser apagada
    And as playlists associadas devem ficar sem categoria
