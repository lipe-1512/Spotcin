import BaseEntity from './base.entity';

class CategoriaEntity extends BaseEntity {
  nome: string;
  playlists: string[];

  constructor(data: Partial<CategoriaEntity>) {
    super(data.id || '');
    this.nome = data.nome || '';
    this.playlists = data.playlists || [];
  }
}

export default CategoriaEntity;
