import { Router, Request, Response } from 'express';
import CategoriaService from '../services/categoria.service';

class CategoriaController {
  public router: Router;

  constructor(router: Router, private categoriaService: CategoriaService) {
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/categorias', this.createCategoria);
    this.router.get('/categorias', this.getCategorias);
    this.router.get('/categorias/:nome', this.getCategoria);
    this.router.delete('/categorias/:nome', this.deleteCategoria);
  }

  private createCategoria = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const result = await this.categoriaService.createCategoria(nome);
    res.status(result.success ? 201 : 400).json(result);
  };

  private getCategorias = async (req: Request, res: Response) => {
    const result = await this.categoriaService.getCategorias();
    res.status(200).json(result);
  };

  private getCategoria = async (req: Request, res: Response) => {
    const { nome } = req.params;
    const result = await this.categoriaService.getCategoria(nome);
    res.status(result ? 200 : 404).json(result);
  };

  private deleteCategoria = async (req: Request, res: Response) => {
    const { nome } = req.params;
    const result = await this.categoriaService.deleteCategoria(nome);
    res.status(result.success ? 200 : 404).json(result);
  };
}

export default CategoriaController;
