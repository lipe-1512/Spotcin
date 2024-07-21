import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import CategoryRepository from '../../src/repositories/categoria.repository';
import CategoryEntity from '../../src/entities/categoria.entity';

const feature = loadFeature('tests/features/category.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // mocking the repository
    let mockCategoryRepository: CategoryRepository;
    let response: supertest.Response;
    let mockCategoryEntity: CategoryEntity;

    beforeEach(() => {
        mockCategoryRepository = di.getRepository<CategoryRepository>(CategoryRepository);
    });

    test('Criar uma nova categoria', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^existem as categorias "(.*)", "(.*)" e "(.*)"$/, async (cat1, cat2, cat3) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat3 }));
        });

        given(/^estou na página "Categorias"$/, async () => {});

        when(/^seleciono a opção "Criar categoria"$/, async () => {});

        when(/^preencho a categoria com o nome "(.*)"$/, async (categoryName) => {
            response = await request.post('/api/categories').send({ nome: categoryName });
        });

        when(/^seleciono a opção "confirmar"$/, async () => {});

        then(/^continuo na página "Categorias"$/, async () => {});

        then(/^a categoria "(.*)" aparece na lista de categorias$/, async (categoryName) => {
            const categories = await mockCategoryRepository.getCategorias();
            expect(categories).toContainEqual(expect.objectContaining({ nome: categoryName }));
        });
    });

    test('Criar uma categoria que já existe', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^existem as categorias "(.*)", "(.*)" e "(.*)"$/, async (cat1, cat2, cat3) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat3 }));
        });

        given(/^estou na página "Categorias"$/, async () => {});

        when(/^seleciono a opção "Criar categoria"$/, async () => {});

        when(/^preencho a categoria com o nome "(.*)"$/, async (categoryName) => {
            response = await request.post('/api/categories').send({ nome: categoryName });
        });

        when(/^seleciono a opção "confirmar"$/, async () => {});

        then(/^uma mensagem informando a categoria já existe$/, async () => {
            expect(response.body.message).toBe('Categoria já existe');
        });

        then(/^não permiti criar categoria "(.*)"$/, async (categoryName) => {
            const categories = await mockCategoryRepository.getCategorias();
            const category = categories.find(cat => cat.nome === categoryName);
            expect(category).toBeUndefined();
        });
    });

    test('Usuário deseja visualizar as categorias existentes e as playlists associadas', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existem as categorias "(.*)" e "(.*)"$/, async (cat1, cat2) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        then(/^ele vai ser redirecionado para a página "(.*)"$/, async (pageName) => {
            expect(response.header.location).toBe(pageName);
        });

        then(/^ele consegue visualizar as playlists "(.*)" e "(.*)"$/, async (playlist1, playlist2) => {
            const playlists = response.body.playlists;
            expect(playlists).toContainEqual(expect.objectContaining({ nome: playlist1 }));
            expect(playlists).toContainEqual(expect.objectContaining({ nome: playlist2 }));
        });
    });

    test('Usuário deseja excluir a categoria que existem uma ou mais playlists associadas', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existe a categoria "(.*)"$/, async (categoryName) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: categoryName }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        when(/^existem as playlists "(.*)" e "(.*)"$/, async (playlist1, playlist2) => {
            const category = await mockCategoryRepository.getCategorias();
            category.playlists = [playlist1, playlist2];
            await mockCategoryRepository.updateCategoria(category);
        });

        when(/^selecionar excluir a categoria "(.*)"$/, async (categoryName) => {
            response = await request.delete(`/api/categories/${categoryName}`);
        });

        then(/^as playlists "(.*)" e "(.*)" ficam sem categoria$/, async (playlist1, playlist2) => {
            const category = await mockCategoryRepository.getCategorias();
            expect(category.playlists).not.toContain(playlist1);
            expect(category.playlists).not.toContain(playlist2);
        });

        then(/^a categoria "(.*)" é apagada$/, async (categoryName) => {
            const category = await mockCategoryRepository.getCategorias();
            expect(category).toBeUndefined();
        });
    });

    test('Editar uma categoria existente', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existe a categoria "(.*)"$/, async (categoryName) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: categoryName }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        when(/^alterar o nome da categoria para "(.*)"$/, async (newCategoryName) => {
            response = await request.put(`/api/categories/${categoryName}`).send({ nome: newCategoryName });
        });

        when(/^selecionar a opção "confirmar"$/, async () => {});

        then(/^continuo na página "Categorias"$/, async () => {});

        then(/^a categoria "(.*)" aparece na lista de categorias$/, async (newCategoryName) => {
            const categories = await mockCategoryRepository.getCategorias();
            expect(categories).toContainEqual(expect.objectContaining({ nome: newCategoryName }));
        });
    });

    test('Editar uma categoria para um nome que já existe', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existem as categorias "(.*)" e "(.*)"$/, async (cat1, cat2) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        when(/^alterar o nome da categoria para "(.*)"$/, async (newCategoryName) => {
            response = await request.put(`/api/categories/${categoryName}`).send({ nome: newCategoryName });
        });

        when(/^selecionar a opção "confirmar"$/, async () => {});

        then(/^uma mensagem informando a categoria já existe$/, async () => {
            expect(response.body.message).toBe('Categoria já existe');
        });

        then(/^a categoria "(.*)" não é alterada$/, async (categoryName) => {
            const category = await mockCategoryRepository.getCategorias();
            expect(category).toBe(categoryName);
        });
    });

    test('Adicionar uma playlist a uma categoria', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existe a categoria "(.*)"$/, async (categoryName) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: categoryName }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        when(/^selecionar a playlist "(.*)" para ser adicionada$/, async (playlistName) => {
            const category = await mockCategoryRepository.getCategorias();
            category.playlists.push(playlistName);
            await mockCategoryRepository.updateCategoria(category);
        });

        then(/^a playlist "(.*)" aparece na categoria "(.*)"$/, async (playlistName, categoryName) => {
            const category = await mockCategoryRepository.getCategorias();
            expect(category.playlists).toContain(playlistName);
        });
    });

    test('Remover uma playlist de uma categoria', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        given(/^existe a categoria "(.*)" com a playlist "(.*)"$/, async (categoryName, playlistName) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: categoryName, playlists: [playlistName] }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (categoryName) => {
            response = await request.get(`/api/categories/${categoryName}`);
        });

        when(/^selecionar a playlist "(.*)" para ser removida$/, async (playlistName) => {
            const category = await mockCategoryRepository.getCategorias();
            category.playlists = category.playlists.filter(playlist => playlist !== playlistName);
            await mockCategoryRepository.updateCategoria(nome);
        });

        then(/^a playlist "(.*)" não aparece mais na categoria "(.*)"$/, async (playlistName, categoryName) => {
            const category = await mockCategoryRepository.getCategorias();
            expect(category.playlists).not.toContain(playlistName);
        });
    });
});
