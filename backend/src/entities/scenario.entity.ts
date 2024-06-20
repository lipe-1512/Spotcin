import UserEntity from './user.entity';
import CategoriaEntity from './categoria.entity';

export default class ScenarioEntity {
  user: UserEntity;
  categoriasExistentes: CategoriaEntity[];
  pagina: string;
  novaCategoria?: CategoriaEntity;
  mensagem?: string;

  constructor(
    user: UserEntity,
    categoriasExistentes: CategoriaEntity[],
    pagina: string,
    novaCategoria?: CategoriaEntity,
    mensagem?: string
  ) {
    this.user = user;
    this.categoriasExistentes = categoriasExistentes;
    this.pagina = pagina;
    this.novaCategoria = novaCategoria;
    this.mensagem = mensagem;
  }
}