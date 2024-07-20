import CategoriaRepository from '../repositories/categoria.repository';
import CategoriaEntity from '../entities/categoria.entity';
import { NotFoundError, InternalServerError } from '../utils/errors/http.error';

class CategoriaServiceMessageCode {
    public static readonly category_not_found = 'category_not_found';
    public static readonly category_creation_error = 'category_creation_error';
    public static readonly category_deletion_error = 'category_deletion_error';
}

class CategoriaService {
    private categoriaRepository: CategoriaRepository;

    constructor(categoriaRepository: CategoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public async createCategoria(nome: string) {
        if (!nome) {
            throw new InternalServerError({
                msg: 'Nome da categoria não pode ser vazio',
                msgCode: CategoriaServiceMessageCode.category_creation_error,
            });
        }

        const existingCategoria = await this.categoriaRepository.getCategoria(nome);
        if (existingCategoria) {
            return { success: false, message: 'Categoria já existe' };
        }

        const newCategoria = new CategoriaEntity({nome});
        const createdCategoria = await this.categoriaRepository.createCategoria(newCategoria);

        if (!createdCategoria) {
            throw new InternalServerError({
                msg: 'Erro ao criar categoria',
                msgCode: CategoriaServiceMessageCode.category_creation_error,
            });
        }

        return { success: true, message: 'Categoria criada com sucesso', data: createdCategoria };
    }

    public async getCategorias() {
        const categorias = await this.categoriaRepository.getCategorias();
        return { success: true, data: categorias };
    }

    public async getCategoria(nome: string) {
        if (!nome) {
            throw new InternalServerError({
                msg: 'Nome da categoria não pode ser vazio',
                msgCode: CategoriaServiceMessageCode.category_not_found,
            });
        }

        const categoria = await this.categoriaRepository.getCategoria(nome);
        if (!categoria) {
            throw new NotFoundError({
                msg: 'Categoria não encontrada',
                msgCode: CategoriaServiceMessageCode.category_not_found,
            });
        }

        return { success: true, data: categoria };
    }

    public async deleteCategoria(nome: string) {
        if (!nome) {
            throw new InternalServerError({
                msg: 'Nome da categoria não pode ser vazio',
                msgCode: CategoriaServiceMessageCode.category_deletion_error,
            });
        }

        const existingCategoria = await this.categoriaRepository.getCategoria(nome);
        if (!existingCategoria) {
            throw new NotFoundError({
                msg: 'Categoria não encontrada',
                msgCode: CategoriaServiceMessageCode.category_not_found,
            });
        }

        await this.categoriaRepository.deleteCategoria(existingCategoria.nome);

        return { success: true, message: 'Categoria excluída com sucesso' };
    }
}

export default CategoriaService;
