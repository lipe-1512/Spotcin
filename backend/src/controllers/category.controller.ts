// category.controller.ts
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
    try {
      const { nome } = req.body;
      const result = await this.categoriaService.createCategoria(nome);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ msg: 'Erro interno ao criar categoria', msgCode: 'failure', error });
    }
  };

  private getCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.categoriaService.getCategorias();
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      if (error instanceof Error) {
        res.status(500).json({ msg: 'Erro interno ao obter categorias', msgCode: 'failure', error: error.message });
      } else {
        res.status(500).json({ msg: 'Erro interno ao obter categorias', msgCode: 'failure', error: String(error) });
      }
    }
  };
  


  private getCategoria = async (req: Request, res: Response) => {
    try {
      const { nome } = req.params;
      const result = await this.categoriaService.getCategoria(nome);
      res.status(result ? 200 : 404).json(result);
    } catch (error) {
      console.error('Erro ao obter categoria:', error);
      res.status(500).json({ msg: 'Erro interno ao obter categoria', msgCode: 'failure', error });
    }
  };

  private deleteCategoria = async (req: Request, res: Response) => {
    try {
      const { nome } = req.params;
      const result = await this.categoriaService.deleteCategoria(nome);
      res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      res.status(500).json({ msg: 'Erro interno ao excluir categoria', msgCode: 'failure', error });
    }
  };
}

export default CategoriaController;
