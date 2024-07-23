// category.service.ts
import CategoriaRepository from '../repositories/categoria.repository';
import CategoriaEntity from '../entities/categoria.entity';

class CategoriaService {
  constructor(private categoriaRepository: CategoriaRepository) {}

  public async createCategoria(nome: string) {
    try {
      const existingCategoria = await this.categoriaRepository.getCategoria(nome);
      
      if (existingCategoria) {
        return { success: false, message: 'Categoria já existe' };
      }
      
      const newCategoria = new CategoriaEntity(nome);
      const createdCategoria = await this.categoriaRepository.createCategoria(newCategoria);
      return { success: true, message: 'Categoria criada com sucesso', data: createdCategoria };
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      return { success: false, message: 'Erro ao criar categoria', error };
    }
  }

  public async getCategorias() {
    return await this.categoriaRepository.getCategorias();
  }

  public async getCategoria(nome: string) {
    return await this.categoriaRepository.getCategoria(nome);
  }

  public async deleteCategoria(nome: string) {
    const existingCategoria = await this.categoriaRepository.getCategoria(nome);
    if (!existingCategoria) {
      return { success: false, message: 'Categoria não encontrada' };
    }
    await this.categoriaRepository.deleteCategoria(existingCategoria.nome);
    return { success: true, message: 'Categoria excluída com sucesso' };
  }
}

export default CategoriaService;
