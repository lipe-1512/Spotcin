import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';

const feature = loadFeature('tests/features/users.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockUserRepository: UserRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockUserRepository = di.getRepository<UserRepository>(UserRepository);
  });

  test('Criar um novo usuário', ({ given, when, then, and }) => {
    given(/^o UserRepository não tem um usuário com email "(.*)"$/, async (userEmail) => {
      // Check if the user does not exist in the repository and delete it if it exists
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (existingUser) {
        await mockUserRepository.deleteUser(existingUser.id);
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)", o email "(.*)" e a senha "(.*)"$/,
      async (url, userName, userEmail, userPassword) => {
        response = await request.post(url).send({
          name: userName,
          email: userEmail,
          password: userPassword,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter o nome "(.*)", o email "(.*)" e a senha "(.*)"$/, (userName, userEmail, userPassword) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            name: userName,
            email: userEmail,
            password: userPassword,
          })
        );
      }
    );
  });

  test('Criar um novo usuário com email já existente', ({ given, when, then, and }) => {
    given(/^o UserRepository tem um usuário com email "(.*)"$/, async (userEmail) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: 'Test User',
          email: userEmail,
          password: 'testpassword',
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)", o email "(.*)" e a senha "(.*)"$/,
      async (url, userName, userEmail, userPassword) => {
        response = await request.post(url).send({
          name: userName,
          email: userEmail,
          password: userPassword,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (error) => {
        expect(response.body.msg).toBe(error);
      }
    );
  });

  test('Atualiza nome do usuário', ({ given, when, then, and }) => {
    given(/^o UserRepository tem um usuário com email "(.*)", e o nome "(.*)"$/, async (userEmail, nome) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: nome,
          email: userEmail,
          password: 'testpassword',
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });
      
    when(/^uma requisição PUT for enviada para "(.*)" com o id do usuário "(.*)", o corpo da requisição sendo um JSON com o nome "(.*)", o email e senha "(.*)"$/,
        async (url, userEmail, userName, userPassword) => {

          // Coloca a id do usuário na url
          const user = await mockUserRepository.getUserByEmail(userEmail);
          const userId = user?.id;
          url = url.replace(':id', userId);

          response = await request.put(url).send({
            name: userName,
            email: userEmail,
            password: userPassword,
          });
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^o JSON da resposta deve conter o nome "(.*)", o email "(.*)" e a senha "(.*)"$/, (userName, userEmail, userPassword) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            name: userName,
            email: userEmail,
            password: userPassword,
          })
        );
      });

  });

  test('Deleta usuário', ({ given, when, then, and }) => {
    given(/^o UserRepository tem um usuário com email "(.*)"$/, async (userEmail) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: "Test User",
          email: userEmail,
          password: 'testpassword',
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });
      
    when(/^uma requisição DELETE for enviada para "(.*)" com o id do usuário "(.*)"$/,
        async (url, userEmail) => {

          // Coloca a id do usuário na url
          const user = await mockUserRepository.getUserByEmail(userEmail);
          const userId = user?.id;
          url = url.replace(':id', userId);

          response = await request.delete(url);
        }
      );
  
      then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
      });

      and(/^não deve haver mais o usuário com email "(.*)"$/, async (userEmail) => {
        const existingUser = await mockUserRepository.getUserByEmail(userEmail);
        expect(existingUser).toBeNull();
      });

  });
});