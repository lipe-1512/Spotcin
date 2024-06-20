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
    id: string,
    data: CategoriaEntity
  ): Promise<CategoriaEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteCategoria(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default CategoriaRepository;
