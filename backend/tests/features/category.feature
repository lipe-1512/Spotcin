Feature: Categorias

Scenario: Criar uma nova categoria
    Given o usuário "Felipe" está logado
    And existem as categorias "Para dormir", "Para o rolê", "Para ouvir no carro"
    And estou na página "Categorias"
    When seleciono a opção "Criar categoria"
    And preencho a categoria com o nome "Sad vibes"
    And seleciono a opção "confirmar"
    Then continuo na página "Categorias"
    And a categoria "Sad Vibes" aparece na lista de categorias

Scenario: Criar uma categoria que já existe
    Given o usuário "Felipe" está logado
    And existem as categorias "Para dormir", "Para o rolê", "Para ouvir no carro"
    And estou na página "Categorias"
    When seleciono a opção "Criar categoria"
    And preencho a categoria com o nome "Para o rolê"
    And seleciono a opção "confirmar"
    Then uma mensagem informando a categoria já existe
    And não permiti criar categoria "Para o rolê"

Scenario: Usuário deseja visualizar as categorias existentes e as playlists associadas
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existem as categorias "Playlists tristes" e "Playlists felizes"
    When ele selecionar a categoria "Playlists tristes"
    Then ele vai ser redirecionado para a página "Playlists tristes"
    And ele consegue visualizar as playlists "Coldplay" e "Sia"

Scenario: Usuário deseja excluir a categoria que existem uma ou mais playlists associadas
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existe a categoria "classic rock para treino"
    When ele selecionar a categoria "classic rock para treino"
    And existem as playlists "classic rock 60 70" e "as melhores do rock"
    And selecionar excluir a categoria "classic rock para treino"
    Then as playlists "classic rock 60 70" e "as melhores do rock" ficam sem categoria
    And a categoria "classic rock para treino" é apagada

Scenario: Editar uma categoria existente
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existe a categoria "Para estudar"
    When ele selecionar a categoria "Para estudar"
    And alterar o nome da categoria para "Para foco"
    And selecionar a opção "confirmar"
    Then continuo na página "Categorias"
    And a categoria "Para foco" aparece na lista de categorias

Scenario: Editar uma categoria para um nome que já existe
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existem as categorias "Para estudar" e "Para foco"
    When ele selecionar a categoria "Para estudar"
    And alterar o nome da categoria para "Para foco"
    And selecionar a opção "confirmar"
    Then uma mensagem informando a categoria já existe
    And a categoria "Para estudar" não é alterada

Scenario: Adicionar uma playlist a uma categoria
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existe a categoria "Para malhar"
    When ele selecionar a categoria "Para malhar"
    And adicionar a playlist "Rock para treinar"
    Then a playlist "Rock para treinar" aparece na categoria "Para malhar"

Scenario: Remover uma playlist de uma categoria
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    And existe a categoria "Para malhar" com a playlist "Rock para treinar"
    When ele selecionar a categoria "Para malhar"
    And remover a playlist "Rock para treinar"
    Then a playlist "Rock para treinar" não aparece mais na categoria "Para malhar"

Scenario: Visualizar playlists sem categoria
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    When ele selecionar a opção "Playlists sem categoria"
    Then ele consegue visualizar as playlists "Relaxar" e "Meditação"

Scenario: Criar categoria sem nome
    Given o usuário "Felipe" está logado
    And ele está na página "Categorias"
    When ele selecionar a opção "Criar categoria"
    And deixar o nome da categoria em branco
    And selecionar a opção "confirmar"
    Then uma mensagem informando que o nome da categoria é obrigatório
    And a categoria não é criada
