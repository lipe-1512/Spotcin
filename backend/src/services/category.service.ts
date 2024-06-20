import CategoriaRepository from '../repositories/categoria.repository';
import CategoriaEntity from '../entities/categoria.entity';

class CategoriaService {
  constructor(private categoriaRepository: CategoriaRepository) {}

  public async createCategoria(nome: string) {
    const existingCategoria = await this.categoriaRepository.getCategoria(nome);
    if (existingCategoria) {
      return { success: false, message: 'Categoria já existe' };
    }
    const newCategoria = new CategoriaEntity('', nome);
    await this.categoriaRepository.createCategoria(newCategoria);
    return { success: true, message: 'Categoria criada com sucesso' };
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
    await this.categoriaRepository.deleteCategoria(existingCategoria.id);
    return { success: true, message: 'Categoria excluída com sucesso' };
  }
}

export default CategoriaService;
