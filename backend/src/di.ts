import Injector from './di/injector';
import CategoriaRepository from './repositories/categoria.repository';
import CategoriaService from './services/categoria.service';
import TestRepository from './repositories/test.repository';
import TestService from './services/test.service';

const injector = new Injector();

// Registrando Repositórios
injector.registerRepository(CategoriaRepository, new CategoriaRepository());
injector.registerRepository(TestRepository, new TestRepository());

// Registrando Serviços
injector.registerService(
  CategoriaService,
  new CategoriaService(injector.getRepository(CategoriaRepository))
);
injector.registerService(
  TestService,
  new TestService(injector.getRepository(TestRepository))
);

export default injector;
