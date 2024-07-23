import request from 'supertest';
import app from '../src/app';

// Criação de Categoria - Sucesso
describe('POST /api/category', () => {
  it('Deve criar uma nova categoria', async () => {
    const res = await request(app)
      .post('/api/category')
      .send({ nome: 'Sad vibes' })
      .expect(201);

    expect(res.body.msg).toBe('Categoria criada com sucesso');
  });

  it('Não deve permitir criar uma categoria que já existe', async () => {
    const res = await request(app)
      .post('/api/category')
      .send({ nome: 'Para o rolê' })
      .expect(409);

    expect(res.body.msg).toBe('Categoria já existe');
  });

  it('Não deve permitir criar uma categoria com nome vazio', async () => {
    const res = await request(app)
      .post('/api/category')
      .send({ nome: '' })
      .expect(400);

    expect(res.body.msg).toBe('Nome da categoria não pode ser vazio');
  });
});

// Visualização de Categorias e Playlists Associadas
describe('GET /api/category/:nome', () => {
  it('Deve visualizar categorias e playlists associadas', async () => {
    const res = await request(app)
      .get('/api/category/Playlists tristes')
      .expect(200);

    expect(res.body.categoria).toBe('Playlists tristes');
    expect(res.body.playlists).toContain('Coldplay');
    expect(res.body.playlists).toContain('Sia');
  });

  it('Deve retornar erro ao tentar visualizar uma categoria que não existe', async () => {
    const res = await request(app)
      .get('/api/category/CategoriaInexistente')
      .expect(404);

    expect(res.body.msg).toBe('Categoria não encontrada');
  });
});

// Exclusão de Categoria com Playlists Associadas
describe('DELETE /api/category/:nome', () => {
  it('Deve excluir a categoria e deixar playlists sem categoria', async () => {
    const res = await request(app)
      .delete('/api/category/classic rock para treino')
      .expect(200);

    expect(res.body.msg).toBe('Categoria excluída com sucesso');
  });

  it('Deve retornar erro ao tentar excluir uma categoria que não existe', async () => {
    const res = await request(app)
      .delete('/api/category/CategoriaInexistente')
      .expect(404);

    expect(res.body.msg).toBe('Categoria não encontrada');
  });
});

// Atualização de Categoria
describe('PUT /api/category/:nome', () => {
  it('Deve atualizar o nome da categoria com sucesso', async () => {
    const res = await request(app)
      .put('/api/category/Para dormir')
      .send({ nome: 'Para relaxar' })
      .expect(200);

    expect(res.body.msg).toBe('Categoria atualizada com sucesso');
  });

  it('Não deve permitir atualizar uma categoria para um nome já existente', async () => {
    const res = await request(app)
      .put('/api/category/Para dormir')
      .send({ nome: 'Para o rolê' })
      .expect(409);

    expect(res.body.msg).toBe('Categoria já existe');
  });
});
