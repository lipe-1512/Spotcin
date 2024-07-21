import BaseEntity from './base.entity';

class CategoriaEntity extends BaseEntity {
  nome: string;

  constructor(data: Partial<CategoriaEntity>) {
    super(data.id || '');
    this.nome = data.nome || '';
  }
}

export default CategoriaEntity;