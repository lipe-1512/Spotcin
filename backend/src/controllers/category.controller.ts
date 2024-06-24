import { Router, Request, Response } from 'express';
import CategoriaService from '../services/category.service';

class CategoriaController {
  public router: Router;

  constructor(router: Router, private categoriaService: CategoriaService) {
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/category', this.createCategoria.bind(this));
    this.router.get('/category', this.getCategorias.bind(this));
    this.router.get('/category/:nome', this.getCategoria.bind(this));
    this.router.delete('/category/:nome', this.deleteCategoria.bind(this));
  }

  private createCategoria = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const result = await this.categoriaService.createCategoria(nome);
    res.status(result.success ? 200 : 400).json(result);
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
