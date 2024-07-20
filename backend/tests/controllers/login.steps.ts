import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';


const feature = loadFeature('tests/features/login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockUserRepository: UserRepository;
  let response: supertest.Response;

  beforeEach(() => {
    mockUserRepository = di.getRepository<UserRepository>(UserRepository);
  });

  test('Login de usuário com credenciais válidas', ({ given, when, then, and }) => {
    given(/^existe um usuário no sistema com email "(.*)" e senha "(.*)"$/, async (userEmail, userPassword) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: "test name",
          email: userEmail,
          password: userPassword,
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o body da requisição contendo o email "(.*)" e senha "(.*)"$/,
      async (url, userEmail, userPassword) => {
        response = await request.post(url).send({
          email: userEmail,
          password: userPassword,
        });
      }
    );

    then(/^o status code da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a msgCode "(.*)"$/, (msgCode) => {
        expect(response.body.msgCode).toBe(msgCode);
      }
    );
  });

  test('Login de usuário com credenciais inválidas', ({ given, when, then, and }) => {
    given(/^existe um usuário no sistema com email "(.*)" e senha "(.*)"$/, async (userEmail, userPassword) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: "test name",
          email: userEmail,
          password: userPassword,
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o body da requisição contendo o email "(.*)" e senha "(.*)"$/,
      async (url, userEmail, userPassword) => {
        response = await request.post(url).send({
          email: userEmail,
          password: userPassword,
        });
      }
    );

    then(/^o status code da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a msgCode "(.*)"$/, (msgCode) => {
        expect(response.body.msgCode).toBe(msgCode);
      }
    );
  });

  test('Login de usuário com credenciais em branco', ({ given, when, then, and }) => {
    given(/^existe um usuário no sistema com email "(.*)" e senha "(.*)"$/, async (userEmail, userPassword) => {
      // Checa se o usuário existe no repositório e cria um novo usuário se não existir
      const existingUser = await mockUserRepository.getUserByEmail(userEmail);
      if (!existingUser) {
        var body = {
          name: "test name",
          email: userEmail,
          password: userPassword,
        }
        await mockUserRepository.createUser(new UserEntity(body));
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o body da requisição contendo o email "(.*)" e senha "(.*)"$/,
      async (url, userEmail, userPassword) => {
        response = await request.post(url).send({
          email: userEmail,
          password: userPassword,
        });
      }
    );

    then(/^o status code da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a msgCode "(.*)"$/, (msgCode) => {
        expect(response.body.msgCode).toBe(msgCode);
      }
    );
  });

});
