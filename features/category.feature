Feature: Categorias

Scenario: Criar uma nova categoria
    Given que o usuário "Felipe" está logado
    And existem as categorias "Para dormir", "Para o rolê", "Para ouvir no carro"
    And o usuário está na página "Categorias"
    When selecionar a opção "Criar categoria"
    And preencher a categoria com o nome "Sad vibes"
    And selecionar a opção "confirmar"
    Then o usuário continua na página "Categorias"
    And a categoria "Sad Vibes" aparece na lista de categorias

Scenario: Criar uma categoria que já existe
    Given que o usuário "Felipe" está logado
    And existem as categorias "Para dormir", "Para o rolê", "Para ouvir no carro"
    And o usuário está na página "Categorias"
    When selecionar a opção "Criar categoria"
    And preencher a categoria com o nome "Para o rolê"
    And selecionar a opção "confirmar"
    Then uma mensagem informando que a categoria já existe é exibida
    And a categoria "Para o rolê" não é criada

Scenario: Visualizar categorias e playlists associadas
    Given que o usuário "Filipe" está logado
    And o usuário está na página "Categorias"
    And existem as categorias "Playlists tristes" e "Playlists felizes"
    When selecionar a categoria "Playlists tristes"
    Then o usuário é redirecionado para a página "Playlists tristes"
    And o usuário consegue visualizar as playlists "Coldplay" e "Sia"

Scenario: Excluir categoria com playlists associadas
    Given que o usuário "Filipe" está logado
    And o usuário está na página "Categorias"
    And existe a categoria "classic rock para treino"
    And existem as playlists "classic rock 60 70" e "as melhores do rock" associadas à categoria "classic rock para treino"
    When selecionar a categoria "classic rock para treino"
    And selecionar a opção "Excluir categoria"
    Then as playlists "classic rock 60 70" e "as melhores do rock" ficam sem categoria
    And a categoria "classic rock para treino" é excluída

Scenario: Editar uma categoria
    Given que o usuário "Filipe" está logado
    And o usuário está na página "Categorias"
    And existe a categoria "Músicas para estudar"
    When selecionar a categoria "Músicas para estudar"
    And alterar o nome da categoria para "Músicas para concentração"
    And selecionar a opção "Salvar"
    Then a categoria é atualizada com o novo nome "Músicas para concentração"

Scenario: Adicionar uma playlist a uma categoria
    Given que o usuário "Filipe" está logado
    And o usuário está na página "Categorias"
    And existe a categoria "Músicas para estudar"
    And existe a playlist "Lo-Fi Beats"
    When selecionar a categoria "Músicas para estudar"
    And selecionar a opção "Adicionar playlist"
    And selecionar a playlist "Lo-Fi Beats"
    And selecionar a opção "Confirmar"
    Then a playlist "Lo-Fi Beats" é adicionada à categoria "Músicas para estudar"