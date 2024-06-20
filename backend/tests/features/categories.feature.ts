import ScenarioEntity from '../entities/scenario.entity';
import UserEntity from '../entities/user.entity';
import CategoriaEntity from '../entities/categoria.entity';
import ScenarioModel from '../models/scenario.model';
import UserModel from '../models/user.model';
import CategoriaModel from '../models/categoria.model';

// Feature 1: Criar uma nova categoria
const feature1 = new ScenarioEntity(
  new UserEntity("Felipe"),
  [
    new CategoriaEntity("Para dormir"),
    new CategoriaEntity("Para o rolê"),
    new CategoriaEntity("Para ouvir no carro"),
  ],
  "Categorias",
  new CategoriaEntity("Sad vibes")
);
console.log("Continua na página 'Categorias'");
console.log("A categoria 'Sad Vibes' aparece na lista de categorias");

// Feature 2: Criar uma categoria, mas já existe
const feature2 = new ScenarioEntity(
  new UserEntity("Felipe"),
  [
    new CategoriaEntity("Para dormir"),
    new CategoriaEntity("Para o rolê"),
    new CategoriaEntity("Para ouvir no carro"),
  ],
  "Categorias",
  new CategoriaEntity("Para o rolê"),
  "A categoria já existe"
);
console.log("Uma mensagem informando a categoria já existe");
console.log("Não permite criar a categoria 'Para o rolê'");

// Feature 3: Visualizar as categorias existentes e as playlists associadas
const feature3 = new ScenarioEntity(
  new UserEntity("Felipe"),
  [
    new CategoriaEntity("Playlists tristes"),
    new CategoriaEntity("Playlists felizes"),
  ],
  "Categorias"
);
console.log("Ele vai ser redirecionado para a página 'Playlists tristes'");
console.log("Ele consegue visualizar as playlists 'Coldplay' e 'Sia'");

// Feature 4: Excluir a categoria que contém playlists associadas
const feature4 = new ScenarioEntity(
  new UserEntity("Felipe"),
  [
    new CategoriaEntity("classic rock para treino"),
  ],
  "Categorias"
);
console.log("As playlists 'classic rock 60 70' e 'as melhores do rock' ficam sem categoria");
console.log("A categoria 'classic rock para treino' é apagada");
