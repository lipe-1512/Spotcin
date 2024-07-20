Feature: Playlists

Scenario: Criar uma Playlist
    Given que o usuário está logado
    When uma requisição POST for enviada para "/api/playlists" com o corpo da requisição sendo um JSON com o nome "Músicas gospels" e descrição "religião é top demais"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "Músicas gospels" e descrição "religião é top demais"

Scenario: Criar uma playlist sem nome
    Given que o usuário está logado
    When uma requisição POST for enviada para "/api/playlists" com o corpo da requisição sendo um JSON com a descrição "religião é top demais"
    Then o status da resposta deve ser "500"

Scenario: Uptade de uma playlist
    Given que o PlaylistRepository tem uma playlist com id "42" e nome "Músicas de madrugada"
    When uma requisição PUT for enviada para "/api/playlists/42" com o corpo da requisição sendo um JSON com o nome "Músicas gospels"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "Músicas gospels"

Scenario: Uptade de uma playlist que não existe
    Given que o PlaylistRepository não tem uma playlist com id "42"
    When uma requisição PUT for enviada para "/api/playlists/42" com o corpo da requisição sendo um JSON com o nome "Músicas gospels"
    Then o status da resposta deve ser "404"

Scenario: Delete de uma playlist
    Given que o PlaylistRepository tem uma playlist com id "42" e nome "as sagradas"
    When uma requisição DELETE for enviada para "/api/playlists/42"
    Then o status da resposta deve ser "200"

Scenario: Delete de uma playlist que não existe
    Given que o PlaylistRepository não tem uma playlist com id "42"
    When uma requisição DELETE for enviada para "/api/playlists/42"
    Then o status da resposta deve ser "404"

Scenario: Adicionar uma música a uma playlist
    Given que o PlaylistRepository tem uma playlist com id "42" e nome "Músicas de madrugada"
    When uma requisição POST for enviada para "/api/playlists/42/songs/fur elise"
    Then o status da resposta deve ser "200"

Scenario: Adicionar uma música a uma playlist que já tem a música
    Given que o PlaylistRepository tem uma playlist com id "42", nome "Músicas de madrugada" e música "fur elise"
    When uma requisição POST for enviada para "/api/playlists/42/songs/fur elise"
    Then o status da resposta deve ser "500"

Scenario: Deletar uma música de uma playlist
    Given que o PlaylistRepository tem uma playlist com id "42", nome "Músicas de madrugada" e música "fur elise"
    When uma requisição DELETE for enviada para "/api/playlists/42/songs/fur elise"
    Then o status da resposta deve ser "200"

Scenario: Deletar uma música de uma playlist que não tem a música
    Given que o PlaylistRepository tem uma playlist com id "42" e nome "Músicas de madrugada"
    When uma requisição DELETE for enviada para "/api/playlists/42/songs/fur elise"
    Then o status da resposta deve ser "404"

