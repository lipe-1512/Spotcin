import CategoriaEntity from '../entities/categoria.entity';
import BaseRepository from './base.repository';

class CategoriaRepository extends BaseRepository<CategoriaEntity> {
  constructor() {
    super('categorias');
  }

  public async getCategorias(): Promise<CategoriaEntity[]> {
    return await this.findAll();
  }

  public async getCategoria(nome: string): Promise<CategoriaEntity | null> {
    return await this.findOne((item) => item.nome === nome);
  }

  public async createCategoria(data: CategoriaEntity): Promise<CategoriaEntity> {
    return await this.add(data);
  }

  public async updateCategoria(
    nome: string,
    data: CategoriaEntity
  ): Promise<CategoriaEntity | null> {
    return await this.update((item) => item.nome === nome, data);
  }

  public async deleteCategoria(nome: string): Promise<void> {
    await this.delete((item) => item.nome !== nome);
  }
}

export default CategoriaRepository;
