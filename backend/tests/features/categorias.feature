Feature: Categorias

# Categoria
Scenario: Criar uma nova categoria
    Given o usuário “Felipe” está logado
    And existem as categorias “Para dormir”, “Para o rolê”, “Para ouvir no carro”
    And estou na página “Categorias”
    When seleciono a opção “Criar categoria”
    And preencho a categoria com o nome “Sad vibes”
    And seleciono a opção “confirmar”
    Then continuo na página “Categorias”
    And a categoria “Sad Vibes” aparece na lista de categorias

Scenario: Criar uma categoria, mas já existe
    Given o usuário “Felipe” está logado
    And existem as categorias “Para dormir”, “Para o rolê”, “Para ouvir no carro”
    And estou na página “Categorias”
    When seleciono a opção “Criar categoria”
    And preencho a categoria com o nome “Para o rolê”
    And seleciono a opção “confirmar”
    Then uma mensagem informando a categoria já existe
    And não permite criar a categoria “Para o rolê”

Scenario: Visualizar as categorias existentes e as playlists associadas
    Given o usuário “Felipe” está logado
    And estou na página “Categorias”
    And existem as categorias “Playlists tristes” e “Playlists felizes”
    When seleciono a categoria “Playlists tristes”
    Then sou redirecionado para a página “Playlists tristes”
    And consigo visualizar as playlists “Coldplay” e “Sia”

Scenario: Excluir a categoria que contém playlists associadas
    Given o usuário “Felipe” está logado
    And estou na página “Categorias”
    And existe a categoria “classic rock para treino”
    And existem as playlists “classic rock 60 70” e “as melhores do rock”
    When seleciono excluir a categoria “classic rock para treino”
    Then as playlists “classic rock 60 70” e “as melhores do rock” ficam sem categoria
    And a categoria “classic rock para treino” é apagada
