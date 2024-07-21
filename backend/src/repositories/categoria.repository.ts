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
    } catch (error) {
      throw new InternalServerError();
    }
  }

  public async createCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity | undefined> {
    try {
      return await this.add(categoria);
    } catch (error) {
      throw new InternalServerError();
    }
  }

  public async updateCategoria(id: string, categoria: CategoriaEntity): Promise<CategoriaEntity | undefined> {
    try {
      const updatedCategoria = await this.update((cat) => cat.id === id, categoria);
      return updatedCategoria ?? undefined;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  public async deleteCategoria(id: string): Promise<void> {
    try {
      await this.delete((cat) => cat.id === id);
    } catch (error) {
      throw new InternalServerError();
    }
  }

  public async getCategoria(id: string): Promise<CategoriaEntity | undefined> {
    try {
      const categorias = await this.findAll();
      return categorias.find((cat) => cat.id === id);
    } catch (error) {
      throw new InternalServerError();
    }
  }
}

export default CategoriaRepository;
