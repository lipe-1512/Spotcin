import { Router, Request, Response } from 'express';
import CategoriaService from '../services/category.service';

class CategoriaController {
    private prefix: string = '/category';
    public router: Router;
    private categoriaService: CategoriaService;

    constructor(router: Router, categoriaService: CategoriaService) {
        this.router = router;
        this.categoriaService = categoriaService;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.prefix, this.createCategoria.bind(this));
        this.router.get(this.prefix, this.getCategorias.bind(this));
        this.router.get(`${this.prefix}/:nome`, this.getCategoria.bind(this));
        this.router.delete(`${this.prefix}/:nome`, this.deleteCategoria.bind(this));
    }

    private async createCategoria(req: Request, res: Response) {
        try {
            const { nome } = req.body;
            const result = await this.categoriaService.createCategoria(nome);
            res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    private async getCategorias(req: Request, res: Response) {
        try {
            const result = await this.categoriaService.getCategorias();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    private async getCategoria(req: Request, res: Response) {
        try {
            const { nome } = req.params;
            const result = await this.categoriaService.getCategoria(nome);
            res.status(result ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    private async deleteCategoria(req: Request, res: Response) {
        try {
            const { nome } = req.params;
            const result = await this.categoriaService.deleteCategoria(nome);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CategoriaController;
