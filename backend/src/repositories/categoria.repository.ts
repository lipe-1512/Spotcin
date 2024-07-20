import CategoriaEntity from '../entities/categoria.entity';
import { InternalServerError } from '../utils/errors/http.error';
import BaseRepository from './base.repository';

class CategoriaRepository extends BaseRepository<CategoriaEntity> {
  constructor() {
    super('categorias');
  }

  public async getCategorias(): Promise<CategoriaEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError('Erro ao buscar todas as categorias');
    }
  }

  public async getCategoria(nome: string): Promise<CategoriaEntity | null> {
    try {
      return await this.findOne((item) => item.nome === nome);
    } catch (e) {
      throw new InternalServerError(`Erro ao buscar a categoria com o nome: ${nome}`);
    }
  }

  public async createCategoria(data: CategoriaEntity): Promise<CategoriaEntity> {
    try {
      return await this.add(data);
    } catch (e) {
      throw new InternalServerError('Erro ao criar categoria');
    }
  }

  public async updateCategoria(nome: string, data: CategoriaEntity): Promise<CategoriaEntity | null> {
    try {
      const updatedCategoria = await this.update((item) => item.nome === nome, data);
      if (updatedCategoria === null) {
        return null;
      }
      return updatedCategoria;
    } catch (e) {
      throw new InternalServerError(`Erro ao atualizar a categoria com o nome: ${nome}`);
    }
  }

  public async deleteCategoria(nome: string): Promise<void> {
    try {
      await this.delete((item) => item.nome === nome);
    } catch (e) {
      throw new InternalServerError(`Erro ao deletar a categoria com o nome: ${nome}`);
    }
  }
}

export default CategoriaRepository;
