Feature: Playlists
As a usuário
I want to criar playlists com minhas músicas escolhidas
So that eu possa escutar as músicas desejadas naquela playlists

Scenario: Criar uma playlist com sucessoo
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
When o usuário seleciona a opção "Criar Playlist"
And o usuário preenche o nome com "Músicas legais", a descrição com
"Algumas músicas" e seleciona a foto "carro.jpg"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a playlist com o nome "Músicas
legais"

Scenario: Falha ao tentar criar uma playlist pois o nome não foi dito
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
When o usuário seleciona a opção "Criar Playlist"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a mensagem "Por favor preencha o campo do nome"

Scenario: Falha ao tentar criar uma playlist pois o nome já existe
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
And a playlist "Músicas legais" já existe
When o usuário seleciona a opção "Criar Playlist"
And o usuário preenche o nome com "Músicas legais", a descrição com
"Algumas músicas" e seleciona a foto "carro.jpg"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a mensagem "Essa playlist já existe, escolha um novo nome"
#And do roteiro, remover depois
#And do roteiro2, remover depois

Scenario: Atualizando uma playlist com sucesso
Given que o usuário "fulano" está logado
And o usuário está na página "Playlists"
And existe uma playlist chamada "Música legais"
When o usuário seleciona os três pontos ao lado do nome "Músicas legais"
And o usuário seleciona a opção "Atualizar"
And o usuário muda o nome para "Músicas de carros"
And o usuário seleciona a opção "Salvar"
Then o usuário ainda está na página "Playlists"
And o usuário consegue ver a imagem "carro.jpg" com o nome "Músicas de carros"

