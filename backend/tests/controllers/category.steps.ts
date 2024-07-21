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

        and(/^existem as categorias "(.*)", "(.*)", "(.*)"$/, async (cat1, cat2, cat3) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat3 }));
        });

        given(/^estou na página "Categorias"$/, async () => {});

        when(/^seleciono a opção "Criar categoria"$/, async () => {});

        when(/^preencho a categoria com o nome "(.*)"$/, async (nome) => {
            response = await request.post('/api/categories').send({ nome });
        });

        when(/^seleciono a opção "confirmar"$/, async () => {});

        then(/^continuo na página "Categorias"$/, async () => {});

        then(/^a categoria "(.*)" aparece na lista de categorias$/, async (nome) => {
            const categories = await mockCategoryRepository.getCategorias();
            expect(categories).toContainEqual(expect.objectContaining({ nome }));
        });
    });

    test('Criar uma categoria que já existe', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        and(/^existem as categorias "(.*)", "(.*)", "(.*)"$/, async (cat1, cat2, cat3) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat3 }));
        });

        given(/^estou na página "Categorias"$/, async () => {});

        when(/^seleciono a opção "Criar categoria"$/, async () => {});

        when(/^preencho a categoria com o nome "(.*)"$/, async (nome) => {
            response = await request.post('/api/categories').send({ nome });
        });

        when(/^seleciono a opção "confirmar"$/, async () => {});

        then(/^uma mensagem informando a categoria já existe$/, async () => {
            expect(response.body.message).toBe('Categoria já existe');
        });

        then(/^não permiti criar categoria "(.*)"$/, async (nome) => {
            const categories = await mockCategoryRepository.getCategorias();
            const category = categories.find(cat => cat.nome === nome);
            expect(category).toBeUndefined();
        });
    });

    test('Usuário deseja visualizar as categorias existentes e as playlists associadas', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        and(/^existem as categorias "(.*)" e "(.*)"$/, async (cat1, cat2) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (nome) => {
            response = await request.get(`/api/categories/${nome}`);
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

        and(/^existe a categoria "(.*)"$/, async (nome) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: nome }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (nome) => {
            response = await request.get(`/api/categories/${nome}`);
        });

        when(/^existem as playlists "(.*)" e "(.*)"$/, async (playlist1, playlist2) => {
            const category = await mockCategoryRepository.getCategoria(playlist1.nome);
            if (category) {
                category.playlists = [playlist1, playlist2];
                await mockCategoryRepository.updateCategoria(category.id, category);
            }
        });

        when(/^selecionar excluir a categoria "(.*)"$/, async (nome) => {
            response = await request.delete(`/api/categories/${nome}`);
        });

        then(/^as playlists "(.*)" e "(.*)" ficam sem categoria$/, async (playlist1, playlist2) => {
            const playlists = await Promise.all([
                mockCategoryRepository.deleteCategoria(playlist1.categories),
                mockCategoryRepository.deleteCategoria(playlist2.categories)
            ]);
            playlists.forEach(playlist => {
                expect(playlist).toBeUndefined();
            });
        });

        then(/^a categoria "(.*)" é apagada$/, async (nome) => {
            const category = await mockCategoryRepository.getCategoria(nome);
            expect(category).toBeUndefined();
        });
    });

    test('Editar uma categoria existente', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        and(/^existe a categoria "(.*)"$/, async (nome) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: nome }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (nome) => {
            response = await request.get(`/api/categories/${nome}`);
        });

        when(/^alterar o nome da categoria para "(.*)"$/, async (novoNome) => {
            response = await request.put(`/api/categories/${novoNome}`).send({ nome: novoNome });
        });

        when(/^selecionar a opção "confirmar"$/, async () => {});

        then(/^continuo na página "Categorias"$/, async () => {});

        then(/^a categoria "(.*)" aparece na lista de categorias$/, async (novoNome) => {
            const categories = await mockCategoryRepository.getCategorias();
            expect(categories).toContainEqual(expect.objectContaining({ nome: novoNome }));
        });
    });

    test('Editar uma categoria para um nome que já existe', ({ given, when, then, and }) => {
        given(/^o usuário "(.*)" está logado$/, async (username) => {});

        given(/^ele está na página "Categorias"$/, async () => {});

        and(/^existem as categorias "(.*)" e "(.*)"$/, async (cat1, cat2) => {
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat1 }));
            await mockCategoryRepository.createCategoria(new CategoryEntity({ nome: cat2 }));
        });

        when(/^ele selecionar a categoria "(.*)"$/, async (nome) => {
            response = await request.get(`/api/categories/${nome}`);
        });

        when(/^alterar o nome da categoria para "(.*)"$/, async (novoNome) => {
            response = await request.put(`/api/categories/${novoNome}`).send({ nome: novoNome });
        });

        when(/^selecionar a opção "confirmar"$/, async () => {});

        then(/^uma mensagem informando a categoria já existe$/, async () => {
            expect(response.body.message).toBe('Categoria já existe');
        });

        then(/^a categoria "(.*)" não é alterada$/, async (nome) => {
            const category = await mockCategoryRepository.getCategoria(nome);
            expect(category).toBeDefined();
        });
    });
});
