import UserModel from './user.model';
import CategoriaModel from './categoria.model';

export default class ScenarioModel {
  user: UserModel;
  categoriasExistentes: CategoriaModel[];
  pagina: string;
  novaCategoria?: CategoriaModel;
  mensagem?: string;

  constructor(
    user: UserModel,
    categoriasExistentes: CategoriaModel[],
    pagina: string,
    novaCategoria?: CategoriaModel,
    mensagem?: string
  ) {
    this.user = user;
    this.categoriasExistentes = categoriasExistentes;
    this.pagina = pagina;
    this.novaCategoria = novaCategoria;
    this.mensagem = mensagem;
  }
}
